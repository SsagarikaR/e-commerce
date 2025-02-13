import { Request, Response, NextFunction } from "express";

export async function errorHandler(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  if (err.status && err.message) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
