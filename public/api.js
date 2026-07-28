async function request(url, options = {}) {
  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.errorMessage);
  }

  return data;
}

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function get(url) {
  return request(url, {
    method: "GET",
  });
}

function post(url, body) {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function sendNextWord(nextWord) {
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

export async function getPreviousWord() {
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

export async function sendResetRequest() {
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
