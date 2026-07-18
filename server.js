import { serveDir } from "jsr:@std/http/file-server";

let previousWord = "しりとり";

Deno.serve(async (_req) => {
  const pathname = new URL(_req.url).pathname;
  console.log(`pathname: ${pathname}`);

  if (_req.method === "GET" && pathname === "/shiritori") {
    return new Response(previousWord);
  }

  if (_req.method === "POST" && pathname === "/shiritori") {
    const requestJson = await _req.json();
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

  return serveDir(
    _req,
    {
      fsRoot: "./public/",
      urlRoot: "",
      enableCors: true,
    },
  );
});
