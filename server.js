import Router from "./router.js";
import Shiritori from "./shiritori.js";

const game = new Shiritori();

const router = new Router();

router.get("/shiritori", sendPreviousWord);
router.post("/shiritori", handleNewWord);

Deno.serve((req) => router.handle(req));

function sendPreviousWord() {
  const previousWord = game.getPreviousWord();
  return Response.json({ previousWord });
}

async function handleNewWord(req) {
  const requestJson = await req.json();
  const nextWord = requestJson["nextWord"];

  const result = game.addNextWord(nextWord);

  if (!result.ok) {
    return Response.json(
      {
        "errorMessage": result.message,
      },
      {
        status: 400,
      },
    );
  }

  const previousWord = game.getPreviousWord();
  return Response.json({ previousWord });
}
