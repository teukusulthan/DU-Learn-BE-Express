import { Request, Response, NextFunction } from "express";
import { prisma } from "../connection/client";

export async function canUpdateProduct(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    const e: any = new Error("Invalid product id");
    e.statusCode = 400;
    throw e;
  }

  const p = await prisma.product.findUnique({
    where: { id },
    select: { supplierId: true },
  });
  if (!p) {
    const e: any = new Error("Product not found");
    e.statusCode = 404;
    throw e;
  }

  const user = (req as any).user; // { id, role }
  const isOwner = user?.role === "SUPPLIER" && p.supplierId === user?.id;
  const isAdmin = user?.role === "ADMIN";
  if (!isOwner && !isAdmin) {
    const e: any = new Error("Forbidden");
    e.statusCode = 403;
    throw e;
  }

  next();
}
