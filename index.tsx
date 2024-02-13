/** @jsxImportSource ai-jsx */
import * as AI from "ai-jsx";
import Task from "micro-agi/core/components/task";
import Team from "micro-agi/core/components/team";

import WalletAgent from "./agents/wallet";

const App = async () => {
  return (
    <Team process="sequential">
      <WalletAgent>
        <Task>Answer the following question "What's connected account?"</Task>
        <Task>Answer the following question "What's the balance of the connected account?"</Task>
        <Task>Mint a token</Task>
      </WalletAgent>
    </Team>
  );
};

const renderContext = AI.createRenderContext();
const result = await renderContext.render(<App />);
await Bun.write(`./result.json`, result);
