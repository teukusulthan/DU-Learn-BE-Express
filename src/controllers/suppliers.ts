import { RequestHandler } from "express";
import { prisma } from "../connection/client";
import { BadRequestError } from "../utils/errors";

export const updateSupplierStock: RequestHandler = async (req, res, next) => {
  const stockChanges = req.body as Array<{
    supplierId: number;
    productId: number;
    delta: number;
  }>;

  if (!Array.isArray(stockChanges) || stockChanges.length === 0) {
    return next(
      new BadRequestError("Body must be an array containing stock data")
    );
  }

  try {
    const results = await prisma.$transaction(async (tx) => {
      const queries = stockChanges.map(async (u) => {
        if (u.delta >= 0) {
          const r = await tx.product.updateMany({
            where: { id: u.productId, supplierId: u.supplierId },
            data: { stock: { increment: u.delta } },
          });
          if (r.count === 0)
            throw new BadRequestError("Update failed: product not found");
          return r;
        } else {
          const amount = Math.abs(u.delta);
          const r = await tx.product.updateMany({
            where: {
              id: u.productId,
              supplierId: u.supplierId,
              stock: { gte: amount },
            },
            data: { stock: { decrement: amount } },
          });
          if (r.count === 0)
            throw new BadRequestError(
              "Update failed: insufficient stock or product not found"
            );
          return r;
        }
      });

      return Promise.all(queries);
    });

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Stock updated successfully",
      data: results,
    });
  } catch (err) {
    next(err);
  }
};
