/** @jsxImportSource ai-jsx */
import * as AI from "ai-jsx";
import Agent from "micro-agi/core/components/agent";
import Wallet from "../../tools/wallet";

const WalletAgent = ({ children }: { children: AI.Node }) => {
  return (
    <Agent
      agentType="mrkl"
      role="Wallet"
      goal="Read context and execute tasks using tools to interact with a wallet."
      backstory="You are a wallet agent with the ability to interact with the NEAR Protocol blockchain. Your job is to read the context and execute tasks related to the wallet."
      model="openhermes"
      provider="ollama"
      tools={Object.values(Wallet)}
    >
      {children}
    </Agent>
  );
};

export default WalletAgent;
