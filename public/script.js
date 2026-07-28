import { getPreviousWord, sendNextWord, sendResetRequest } from "./api.js";
import UI from "./ui.js";

const ui = new UI();

window.onload = initUI;
ui.resetButton.onclick = async () => {
  await resetGame();
  await initUI();
};

ui.nextWordSendButton.onclick = async () => {
  const nextWordInputText = ui.getNextWordInputValue();
  const result = await sendNextWord(nextWordInputText);

  if (handleNetworkError(result)) return;

  if (result.status === "ruleError") {
    ui.showError(result.values.message);
    return;
  }

  const { previousWord, gameEnd, message } = result.values;
  if (gameEnd) {
    ui.showGameEnd(previousWord, message);
    return;
  }

  ui.updatePreviousWord(previousWord);
  ui.clearNextWordInput();
};

function handleNetworkError(result) {
  if (result.status === "networkError") {
    ui.showError("通信エラーが発生しました");
    return true;
  }
  return false;
}

async function initUI() {
  ui.showGame();
  ui.clearNextWordInput();

  const result = await getPreviousWord();

  if (handleNetworkError(result)) return;

  ui.updatePreviousWord(result.values.previousWord);
}

async function resetGame() {
  const result = await sendResetRequest();
  handleNetworkError(result);
}
