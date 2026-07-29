export default class UI {
  #nextWordInput;
  #previousWordOutput;
  #errorModal;
  #closeErrorModalButton;
  #errorMessageOutput;
  #inGameDisplay;
  #gameEndDisplay;
  #lastWordOutput;
  #gameEndReasonOutput;
  constructor() {
    this.inputForm = document.querySelector("#input-form");
    this.nextWordSendButton = document.querySelector("#next-word-send-button");
    this.#nextWordInput = document.querySelector("#next-word-input");

    this.#previousWordOutput = document.querySelector("#previous-word");

    this.#errorModal = document.querySelector("#error-modal");
    this.#closeErrorModalButton = document.querySelector(
      "#close-error-modal-button",
    );
    this.#errorMessageOutput = document.querySelector("#error-message");

    this.#inGameDisplay = document.querySelector("#in-game");
    this.#gameEndDisplay = document.querySelector("#game-end");
    this.#lastWordOutput = document.querySelector("#last-word");
    this.#gameEndReasonOutput = document.querySelector("#game-end-reason");

    this.resetButton = document.querySelector("#reset-button");

    this.#closeErrorModalButton.onclick = () => {
      this.#errorModal.close();
    };
  }

  getNextWordInputValue() {
    return this.#nextWordInput.value;
  }

  clearNextWordInput() {
    this.#nextWordInput.value = "";
  }

  updatePreviousWord(previousWord) {
    this.#previousWordOutput.textContent = `前の単語: ${previousWord}`;
  }

  showGame() {
    this.#inGameDisplay.style.display = "block";
    this.#gameEndDisplay.style.display = "none";
  }

  showGameEnd(lastWord, reason) {
    this.#inGameDisplay.style.display = "none";
    this.#gameEndDisplay.style.display = "block";
    this.#lastWordOutput.textContent = lastWord;
    this.#gameEndReasonOutput.textContent = reason;
  }

  showError(message) {
    this.#errorMessageOutput.textContent = message;
    this.#errorModal.showModal();
  }
}
