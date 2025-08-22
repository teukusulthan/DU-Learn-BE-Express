import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = Number.isInteger(err?.status) ? err.status : 500;
  const payload: any = { error: err?.message || "Internal Server Error" };
  if (process.env.NODE_ENV !== "production" && err?.stack)
    payload.stack = err.stack;
  res.status(status).json(payload);
}
