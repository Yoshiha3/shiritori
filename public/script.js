import { ApiError, get, post } from "./api.js";

window.onload = async () => {
  try {
    const { previousWord } = await get("/shiritori");
    updatePreviousWord(previousWord);
  } catch (_e) {
    showError("通信エラーが発生しました。");
    return;
  }
};

document.querySelector("#nextWordSendButton").onclick = async () => {
  const nextWordInput = document.querySelector("#nextWordInput");
  const nextWordInputText = nextWordInput.value;
  try {
    const { previousWord, gameEnd } = await post("/shiritori", {
      nextWord: nextWordInputText,
    });
    if (gameEnd) {
      console.log("Game End!!");
      showGameEnd();
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
  const paragraph = document.querySelector("#previousWord");
  paragraph.textContent = `前の単語: ${previousWord}`;
}

const errorModal = document.querySelector("#errorModal");

document.querySelector("#closeErrorModalButton").onclick = () => {
  errorModal.close();
};

function showError(message) {
  document.querySelector("#errorMessage").textContent = message;
  errorModal.showModal();
}

function showGameEnd() {
  document.querySelector("#in-game").style.display = "none";
  document.querySelector("#game-end").style.display = "block";
}
