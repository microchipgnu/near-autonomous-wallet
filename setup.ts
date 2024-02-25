import { $ } from "bun";
import { KeyPair } from "near-api-js";
import open from "open";
import readline from "readline";
import { parseSeedPhrase } from "near-seed-phrase";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let hasOpenhermes = false;
try {
  const getOpenhermes = await $`ollama list | grep "openhermes:latest"`.quiet();

  hasOpenhermes = getOpenhermes.stdout.byteLength > 0;
} catch (error) {
  hasOpenhermes = false;
}

if (!hasOpenhermes) {
  await $`ollama pull openhermes`;
}

function generateKeyPair() {
  // Generate a new random key pair
  const keyPair = KeyPair.fromRandom("ed25519");

  return {
    publicKey: keyPair.getPublicKey().toString(),
    // @ts-ignore
    privateKey: keyPair.extendedSecretKey.toString(),
  };
}

// Opens the URL in the default browser.
// open("https://github.com/micro-agi/near-autonomous-wallet");

const askAccount = () => {
  rl.question("Your accountId: ", async (accountId) => {
    if (accountId) {
      const keyPair = generateKeyPair();

      const ENV = `
OPENAI_API_BASE=http://127.0.0.1:11434/v1
OPENAI_API_KEY=ollama-no-need-api-key
    
NEAR_ACCOUNT_ID=${accountId}
NEAR_ACCOUNT_FULL_ACCESS_KEY=ed25519:${keyPair.privateKey}
`;

      Bun.write(`.env.local`, ENV);

      const action = {
        type: "AddKey",
        params: {
          publicKey: keyPair.publicKey,
          accessKey: {
            permission: "FullAccess",
          },
          gas: "200000000000000",
          deposit: "0",
        },
      };

      const txArgs = encodeURIComponent(
        JSON.stringify({
          receiverId: accountId,
          actions: [action],
        })
      );

      open(
        `https://mintbase-wallet-git-import-private-key-not-forc-a19a8a-mintbase.vercel.app/import/private-key#${accountId}/${keyPair.privateKey}`
      );
      rl.close();
    } else {
      askAccount();
    }
  });
};

askAccount();
