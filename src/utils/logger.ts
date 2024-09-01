import { NextFunction, Request, Response } from "express"

const server = (...args: any[]) => console.log('[SERVER]', ...args)

const api = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", function() {
    console.log("[API]", req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
  });
  next()
}

const error = (...args: any[]) => console.error('[ERROR]', ...args)

const debug = (...args: any[]) => console.info('[DEBUG]', ...args)

const db = (...args: any[]) => console.log('[DB]', ...args)

export default { server, api, error, debug, db }
