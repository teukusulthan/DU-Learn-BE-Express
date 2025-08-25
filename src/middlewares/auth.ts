import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    const err: any = new Error("Authorization token is required");
    err.statusCode = 401;
    throw err;
  }
  try {
    (req as any).user = verifyToken(token);
    next();
  } catch {
    const err: any = new Error("Invalid or expired token");
    err.statusCode = 401;
    throw err;
  }
}
