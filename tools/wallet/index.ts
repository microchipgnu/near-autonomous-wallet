import { getBalance } from "@mintbase-js/rpc";
import { BN } from "bn.js";
import * as nearAPI from "near-api-js";

const { keyStores, KeyPair } = nearAPI;
const myKeyStore = new keyStores.InMemoryKeyStore();

const connectionConfig = {
  networkId: "testnet",
  keyStore: myKeyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://testnet.nearblocks.io",
};

const PRIVATE_KEY = process.env.NEAR_ACCOUNT_FULL_ACCESS_KEY!;

const Wallet = {
  GetWallet: {
    name: "getConnectedAccount",
    description: "Gets the current connected account to the wallet",
    callback: async () => {
      const nearAccountId = process.env.NEAR_ACCOUNT_ID;

      if (!nearAccountId) return "No connected account";

      return `Connected account is "${nearAccountId}"`;
    },
  },
  GetBalance: {
    name: "getAccountBalance",
    description: "Gets the current connected account balance",
    callback: async () => {
      const nearAccountId = process.env.NEAR_ACCOUNT_ID;
      if (!nearAccountId) return "No connected account";

      const balance = await getBalance(nearAccountId, "testnet");

      const formattedBalance = nearAPI.utils.format.formatNearAmount(
        balance.toString(),
        2
      );

      return `Connected account balance is ${formattedBalance} NEAR`;
    },
  },
  MintToken: {
    name: "mintToken",
    description: "Mint a token",
    callback: async () => {
      const nearAccountId = process.env.NEAR_ACCOUNT_ID!;
      const keyPair = KeyPair.fromString(PRIVATE_KEY);

      await myKeyStore.setKey("testnet", nearAccountId, keyPair);

      const nearConnection = await nearAPI.connect(connectionConfig);
      const account = await nearConnection.account(nearAccountId);

      try {
        const result = await account.functionCall({
          methodName: "mint",
          contractId: "1.minsta.mintbus.testnet",
          args: {
            metadata: '{"media":"YK-UNJYRmXK9INoxBUPSn-pDEyiT_7InC95-vN3wmSU"}',
            nft_contract_id: "minsta.mintspace2.testnet",
          },
          gas: new BN("300000000000000"),
          attachedDeposit: new BN("10000000000000000000000"),
        });

        return `Token minted. The transaction hash is ${result.transaction_outcome.id}. You can see more information on https://testnet.nearblocks.io/txns/${result.transaction_outcome.id}`;
      } catch (error) {
        console.log(error);
        return "Token failed to mint";
      }
    },
  },
};

export default Wallet;
