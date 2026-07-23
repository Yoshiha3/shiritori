import { ApiError, get, post } from "./api.js";

window.onload = async () => {
  try {
    const { previousWord } = await get("/shiritori");
    updatePreviousWord(previousWord);
  } catch (_e) {
    alert("通信エラーが発生しました。");
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
    if (gameEnd) console.log("Game End!!");
    updatePreviousWord(previousWord);
    nextWordInput.value = "";
  } catch (e) {
    if (e instanceof ApiError) {
      alert(e.message);
    } else {
      alert("通信エラーが発生しました。");
    }
    return;
  }
};

function updatePreviousWord(previousWord) {
  const paragraph = document.querySelector("#previousWord");
  paragraph.textContent = `前の単語: ${previousWord}`;
}
