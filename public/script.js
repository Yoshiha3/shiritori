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
  const result = await sendNextWord(nextWordInputText);

  if (!result.connectionOk) {
    ui.showError("通信エラーが発生しました");
    return;
  }

  if (!result.ruleOk) {
    ui.showError(result.values.message);
    return;
  }

  const { previousWord, gameEnd } = result.values;
  if (gameEnd) {
    ui.showGameEnd(previousWord);
    return;
  }

  ui.updatePreviousWord(previousWord);
  ui.clearNextWordInput();
};

async function sendNextWord(nextWord) {
  try {
    const { previousWord, gameEnd } = await post("/shiritori", { nextWord });
    return {
      connectionOk: true,
      ruleOk: true,
      values: {
        previousWord,
        gameEnd,
      },
    };
  } catch (e) {
    if (e instanceof ApiError) {
      return {
        connectionOk: true,
        ruleOk: false,
        values: {
          message: e.message,
        },
      };
    } else {
      return {
        connectionOk: false,
      };
    }
  }
}

async function getPreviousWord() {
  try {
    const { previousWord } = await get("/shiritori");
    return {
      connectionOk: true,
      values: {
        previousWord,
      },
    };
  } catch (_e) {
    return {
      connectionOk: false,
    };
  }
}

async function init() {
  ui.showGame();
  ui.clearNextWordInput();

  const result = await getPreviousWord();

  if (!result.connectionOk) {
    ui.showError("通信エラーが発生しました");
    return;
  }

  ui.updatePreviousWord(result.values.previousWord);
}

async function sendResetRequest() {
  try {
    await post("/reset", {});
    return {
      connectionOk: true,
    };
  } catch (_e) {
    return {
      connectionOk: false,
    };
  }
}

async function resetGame() {
  const result = await sendResetRequest();

  if (!result.connectionOk) {
    ui.showError("通信エラーが発生しました");
  }
}
