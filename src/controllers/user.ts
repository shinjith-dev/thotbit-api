import errorWrapper from "../utils/error-wrapper";
import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { create, isEmailInUse, list } from "../repositories/user";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../utils/validator";
import { v4 as uniqueId } from "uuid";
import { hash, verify } from "argon2";
import { User } from "../lib/types";

export const getUsers = errorWrapper(
  async (_req: Request, res: Response, next: NextFunction) => {
    const { data, success } = await list();
    if (!success) return next();

    res.json({ message: "list of all users", data, success: true });
  },
);

export const createUser = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.json({
        message: "email, password and username is required",
        success: false,
      });
    if (!isValidUsername(username))
      return res.json({ message: "Invalid username format", success: false });
    if (!isValidPassword(password))
      return res.json({ message: "Invalid password format", success: false });
    if (!isValidEmail(email))
      return res.json({ message: "Invalid email format", success: false });

    const { exists, success } = await isEmailInUse(email);
    if (!success) next();

    if (exists)
      return res.json({
        message: "Email address already in use",
        success: false,
      });

    const user: User = {
      id: uniqueId() as string,
      uid: uniqueId() as string,
      username,
      email,
      password_hash: await hash(password),
      verified: 0,
    };

    logger.debug(user);

    await create(user);

    logger.debug(req.body);
    res.json({ message: "User created" });
  },
);
