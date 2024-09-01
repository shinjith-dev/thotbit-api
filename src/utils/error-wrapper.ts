import { Request, Response, NextFunction } from "express";

export default function errorWrapper<T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>,
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
