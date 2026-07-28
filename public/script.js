import { ApiError, get, post } from "./api.js";
import UI from "./ui.js";

const ui = new UI();

window.onload = init;
ui.resetButton.onclick = async () => {
  await resetGame();
  await init();
};

ui.nextWordSendButton.onclick = async () => {
  const nextWordInputText = ui.getNextWordInputValue();
  try {
    const { previousWord, gameEnd } = await post("/shiritori", {
      nextWord: nextWordInputText,
    });
    if (gameEnd) {
      console.log("Game End!!");
      ui.showGameEnd(previousWord);
      return;
    }
    ui.updatePreviousWord(previousWord);
    ui.clearNextWordInput();
  } catch (e) {
    if (e instanceof ApiError) {
      ui.showError(e.message);
    } else {
      ui.showError("通信エラーが発生しました。");
    }
  }
};

async function init() {
  ui.showGame();
  ui.clearNextWordInput();
  try {
    const { previousWord } = await get("/shiritori");
    ui.updatePreviousWord(previousWord);
  } catch (_e) {
    ui.showError("通信エラーが発生しました。");
  }
}

async function resetGame() {
  try {
    await post("/reset", {});
  } catch (_e) {
    ui.showError("通信エラーが発生しました。");
  }
}
