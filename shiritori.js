import { error } from "node:console";

export default class Shiritori {
  #wordHistory = [];
  #gameEnd = false;
  constructor(initialWord = "しりとり") {
    this.#wordHistory.push(initialWord);
  }

  getPreviousWord() {
    return this.#wordHistory[this.#wordHistory.length - 1];
  }

  #nextWordErrorCheck(nextWord) {
    const errorDefinitions = [
      {
        condition: (_) => this.#gameEnd,
        message: "ゲームは終了しています",
      },
      {
        condition: (nextWord) =>
          this.getPreviousWord().slice(-1) != nextWord.slice(0, 1),
        message: "前の単語に続いていません",
      },
    ];

    const matchedError = errorDefinitions.find((errorDefinition) =>
      errorDefinition.condition(nextWord)
    );

    return matchedError ? matchedError.message : null;
  }

  addNextWord(nextWord) {
    const errorMessage = this.#nextWordErrorCheck(nextWord);
    if (errorMessage) {
      return {
        ok: false,
        gameEnd: this.#gameEnd,
        message: errorMessage,
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
