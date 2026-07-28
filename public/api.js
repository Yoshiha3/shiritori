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

class Result {
  constructor(status, values = {}) {
    this.status = status;
    this.values = values;
  }

  static success(values) {
    return new Result("success", values);
  }

  static ruleError(message) {
    return new Result("ruleError", { message });
  }

  static networkError() {
    return new Result("networkError");
  }
}

export async function sendNextWord(nextWord) {
  try {
    const { previousWord, gameEnd, message } = await post("/shiritori", {
      nextWord,
    });
    return Result.success({ previousWord, gameEnd, message });
  } catch (e) {
    if (e instanceof ApiError) {
      return Result.ruleError(e.message);
    }

    return Result.networkError();
  }
}

export async function getPreviousWord() {
  try {
    const { previousWord } = await get("/shiritori");
    return Result.success({ previousWord });
  } catch (_e) {
    return Result.networkError();
  }
}

export async function sendResetRequest() {
  try {
    await post("/reset", {});
    return Result.success();
  } catch (_e) {
    return Result.networkError();
  }
}
