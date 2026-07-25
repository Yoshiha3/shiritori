export default class Shiritori {
  #wordHistory = [];
  #gameEnd = false;
  constructor(initialWord = "しりとり") {
    this.#wordHistory.push(initialWord);
  }

  getPreviousWord() {
    return this.#wordHistory[this.#wordHistory.length - 1];
  }

  addNextWord(nextWord) {
    if (this.#gameEnd) {
      return {
        ok: false,
        gameEnd: this.#gameEnd,
        message: "ゲームは終了しています",
      };
    }

    if (this.getPreviousWord().slice(-1) != nextWord.slice(0, 1)) {
      return {
        ok: false,
        gameEnd: this.#gameEnd,
        message: "前の単語に続いていません",
      };
    }

    this.#wordHistory.push(nextWord);

    if (nextWord.slice(-1) === "ん") {
      this.#gameEnd = true;
      return {
        ok: true,
        gameEnd: this.#gameEnd,
        message: "",
      };
    }

    if (this.#wordHistory.filter((word) => word === nextWord).length >= 2) {
      this.#gameEnd = true;
      return {
        ok: true,
        gameEnd: this.#gameEnd,
        message: "",
      };
    }

    return {
      ok: true,
      gameEnd: this.#gameEnd,
      message: "",
    };
  }
}
