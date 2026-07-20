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
    const data = await post("/shiritori", { nextWord: nextWordInputText });
    updatePreviousWord(data.previousWord);
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
