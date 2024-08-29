import { NextFunction, Request, Response } from "express"

const server = (...args: string[]) => console.log('[SERVER]', ...args)

const api = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", function() {
    console.log("[API]", req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
  });
  next()
}

export default { server, api }
