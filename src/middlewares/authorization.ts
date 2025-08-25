import { Request, Response, NextFunction } from "express";

export const requireRole =
  (...roles: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const role = (req as any).user?.role;
    if (!role || !roles.includes(role)) {
      const e: any = new Error("Forbidden");
      e.statusCode = 403;
      throw e;
    }
    next();
  };
