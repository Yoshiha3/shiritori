export default class Shiritori {
  #wordHistory = [];
  constructor(initialWord = "しりとり") {
    this.#wordHistory.push(initialWord);
  }

  getPreviousWord() {
    return this.#wordHistory[this.#wordHistory.length - 1];
  }

  addNextWord(nextWord) {
    if (this.getPreviousWord().slice(-1) === nextWord.slice(0, 1)) {
      this.#wordHistory.push(nextWord);
      return {
        ok: true,
        message: "",
      };
    } else {
      return {
        ok: false,
        message: "前の単語に続いていません",
      };
    }
  }
}
