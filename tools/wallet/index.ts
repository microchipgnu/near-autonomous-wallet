import { getBalance } from "@mintbase-js/rpc";
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
      try {
        const action = {
          type: "FunctionCall",
          params: {
            methodName: "mint",
            contractId: "1.minsta.mintbus.testnet",
            args: {
              metadata:
                '{"media":"YK-UNJYRmXK9INoxBUPSn-pDEyiT_7InC95-vN3wmSU"}',
              nft_contract_id: "minsta.mintspace2.testnet",
            },
            gas: "200000000000000",
            deposit: "10000000000000000000000"
          },
        };


        const txArgs = encodeURIComponent(
          JSON.stringify({
            receiverId: "1.minsta.mintbus.testnet",
            actions: [action],
          })
        );

        const link = `https://testnet.wallet.mintbase.xyz/sign-transaction?transactions_data=[${txArgs}]`;

        return `Token minted at ${link}`;
      } catch (error) {
        console.log(error);
        return "Token failed to mint";
      }
    },
  },
};

export default Wallet;
