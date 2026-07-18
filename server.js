import Router from "./router.js";
import Shiritori from "./shiritori.js";

const game = new Shiritori();

const router = new Router();

router.get("/shiritori", sendPreviousWord);
router.post("/shiritori", handleNewWord);

Deno.serve((req) => router.handle(req));

function sendPreviousWord() {
  const previousWord = game.getPreviousWord();
  return new Response(previousWord);
}

async function handleNewWord(req) {
  const requestJson = await req.json();
  const nextWord = requestJson["nextWord"];

  const result = game.addNextWord(nextWord);

  if (!result.ok) {
    return new Response(
      JSON.stringify({
        "errorMessage": result.message,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      },
    );
  }

  const lastWord = game.getPreviousWord();
  return new Response(lastWord);
}
