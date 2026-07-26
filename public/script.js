import { ApiError, get, post } from "./api.js";

const nextWordSendButton = document.querySelector("#next-word-send-button");
const nextWordInput = document.querySelector("#next-word-input");

const previousWordOutput = document.querySelector("#previous-word");

const errorModal = document.querySelector("#error-modal");
const closeErrorModalButton = document.querySelector(
  "#close-error-modal-button",
);
const errorMessageOutput = document.querySelector("#error-message");

const inGameDisplay = document.querySelector("#in-game");
const gameEndDisplay = document.querySelector("#game-end");
const lastWordOutput = document.querySelector("#last-word");

const resetButton = document.querySelector("#reset-button");

window.onload = async () => {
  try {
    const { previousWord } = await get("/shiritori");
    updatePreviousWord(previousWord);
  } catch (_e) {
    showError("通信エラーが発生しました。");
    return;
  }
};

nextWordSendButton.onclick = async () => {
  const nextWordInputText = nextWordInput.value;
  try {
    const { previousWord, gameEnd } = await post("/shiritori", {
      nextWord: nextWordInputText,
    });
    if (gameEnd) {
      console.log("Game End!!");
      showGameEnd(previousWord);
      return;
    }
    updatePreviousWord(previousWord);
    nextWordInput.value = "";
  } catch (e) {
    if (e instanceof ApiError) {
      showError(e.message);
    } else {
      showError("通信エラーが発生しました。");
    }
    return;
  }
};

function updatePreviousWord(previousWord) {
  previousWordOutput.textContent = `前の単語: ${previousWord}`;
}

closeErrorModalButton.onclick = () => {
  errorModal.close();
};

function showError(message) {
  errorMessageOutput.textContent = message;
  errorModal.showModal();
}

function showGameEnd(lastWord) {
  inGameDisplay.style.display = "none";
  gameEndDisplay.style.display = "block";
  lastWordOutput.textContent = lastWord;
}

function showGame() {
  inGameDisplay.style.display = "block";
  gameEndDisplay.style.display = "none";
}

resetButton.onclick = async () => {
  try {
    await post("/reset");
    showGame();
    const { previousWord } = await get("/shiritori");
    updatePreviousWord(previousWord);
    nextWordInput.value = "";
  } catch (e) {
    console.error(e.message);
  }
};
