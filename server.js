import Router from "./router.js";

const router = new Router();
let previousWord = "しりとり";

router.get("/shiritori", sendPreviousWord);
router.post("/shiritori", handleNewWord);

Deno.serve((req) => router.handle(req));

function sendPreviousWord() {
  return new Response(previousWord);
}

async function handleNewWord(req) {
  const requestJson = await req.json();
  const nextWord = requestJson["nextWord"];

  if (previousWord.slice(-1) === nextWord.slice(0, 1)) {
    previousWord = nextWord;
  } else {
    return new Response(
      JSON.stringify({
        "errorMessage": "前の単語に続いていません",
        "errorCode": "10001",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      },
    );
  }

  return new Response(previousWord);
}
