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
      {
        condition: (nextWord) => {
          const regex = /^[ぁ-んー]+$/u;
          return !regex.test(nextWord);
        },
        message: "ひらがなでない文字が入力されています",
      },
    ];

    const matchedError = errorDefinitions.find((errorDefinition) =>
      errorDefinition.condition(nextWord)
    );

    return matchedError ? matchedError.message : null;
  }

  #checkGameEnd(nextWord) {
    const endDefinitions = [
      {
        condition: (nextWord) => nextWord.slice(-1) === "ん",
        message: "入力された単語の最後の文字が「ん」です",
      },
      {
        condition: (nextWord) =>
          this.#wordHistory.filter((word) => word === nextWord).length >= 2,
        message: "過去に使用された単語が入力されました",
      },
    ];
    const matchedEnd = endDefinitions.find((endDefinition) =>
      endDefinition.condition(nextWord)
    );
    return matchedEnd ? matchedEnd.message : null;
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

    const endMessage = this.#checkGameEnd(nextWord);

    if (endMessage) {
      this.#gameEnd = true;
      return {
        ok: true,
        gameEnd: this.#gameEnd,
        message: endMessage,
      };
    }

    return {
      ok: true,
      gameEnd: this.#gameEnd,
      message: "",
    };
  }
}
