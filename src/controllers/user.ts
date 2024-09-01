import errorWrapper from "../utils/error-wrapper";
import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { list } from "../repositories/user";

export const getUsers = errorWrapper(
  async (_req: Request, res: Response, next: NextFunction) => {
    const { data, success } = await list();
    if (!success) return next();

    res.json({ message: "list of all users", data });
  },
);

export const createUser = errorWrapper(async (req: Request, res: Response) => {
  logger.debug(req.body);
  res.json({ message: "User created" });
});
