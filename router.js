import { serveDir } from "jsr:@std/http/file-server";

export default class Router {
  #routes = [];

  get(pathname, handler) {
    this.#routes.push({ method: "GET", pathname, handler });
  }

  post(pathname, handler) {
    this.#routes.push({ method: "POST", pathname, handler });
  }

  handle(req) {
    const pathname = new URL(req.url).pathname;
    const method = req.method;
    const route = this.#routes.find((r) =>
      r.pathname === pathname && r.method === method
    );

    if (route) {
      return route.handler(req);
    }

    return serveDir(
      req,
      {
        fsRoot: "./public/",
        urlRoot: "",
        enableCors: true,
      },
    );
  }
}
