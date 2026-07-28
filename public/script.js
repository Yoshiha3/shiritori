import { getPreviousWord, sendNextWord, sendResetRequest } from "./api.js";
import UI from "./ui.js";

const ui = new UI();

window.onload = init;
ui.resetButton.onclick = async () => {
  await resetGame();
  await init();
};

ui.nextWordSendButton.onclick = async () => {
  const nextWordInputText = ui.getNextWordInputValue();
  const result = await sendNextWord(nextWordInputText);

  switch (result.status) {
    case "networkError":
      ui.showError("通信エラーが発生しました");
      return;
    case "ruleError":
      ui.showError(result.values.message);
      return;
    case "success":
      break;
  }

  const { previousWord, gameEnd } = result.values;
  if (gameEnd) {
    ui.showGameEnd(previousWord);
    return;
  }

  ui.updatePreviousWord(previousWord);
  ui.clearNextWordInput();
};

async function init() {
  ui.showGame();
  ui.clearNextWordInput();

  const result = await getPreviousWord();

  switch (result.status) {
    case "networkError":
      ui.showError("通信エラーが発生しました");
      return;
    case "success":
      break;
  }

  ui.updatePreviousWord(result.values.previousWord);
}

async function resetGame() {
  const result = await sendResetRequest();

  switch (result.status) {
    case "networkError":
      ui.showError("通信エラーが発生しました");
      return;
    case "success":
      break;
  }
}
