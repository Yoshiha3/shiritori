window.onload = async () => {
  const response = await fetch("/shiritori", { method: "GET" });
  const previousWord = await response.text();
  const paragraph = document.querySelector("#previousWord");
  paragraph.innerHTML = `前の単語: ${previousWord}`;
};

document.querySelector("#nextWordSendButton").onclick = async () => {
  const nextWordInput = document.querySelector("#nextWordInput");
  const nextWordInputText = nextWordInput.value;
  const response = await fetch(
    "/shiritori",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nextWord: nextWordInputText }),
    },
  );

  if (response.status !== 200) {
    const errorJson = await response.text();
    const errorObj = JSON.parse(errorJson);
    alert(errorObj["errorMessage"]);
    return;
  }

  const previousWord = await response.text();
  const paragraph = document.querySelector("#previousWord");
  paragraph.innerHTML = `前の単語: ${previousWord}`;
  nextWordInput.value = "";
};
