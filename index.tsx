/** @jsxImportSource ai-jsx */
import * as AI from "ai-jsx";
import Agent from "micro-agi/core/components/agent";
import Task from "micro-agi/core/components/task";
import Team from "micro-agi/core/components/team";
import Wallet from "./tools/wallet";

const App = async () => {
  return (
    <Team process="sequential">
      <Agent
        agentType="mrkl"
        role="Wallet"
        goal="Read context and execute tasks using tools to interact with a wallet."
        backstory="You are a wallet agent with the ability to interact with the NEAR Protocol blockchain. Your job is to read the context and execute tasks related to the wallet."
        model="openhermes"
        provider="ollama"
        tools={Object.values(Wallet)}
      >
        <Task>
          Return the account address connected to the configured wallet. Your
          output should be the conncted account.
        </Task>
        <Task>
          Mint a token
        </Task>
      </Agent>
    </Team>
  );
};

const renderContext = AI.createRenderContext();
const result = await renderContext.render(<App />);
await Bun.write(`./result.json`, result);
