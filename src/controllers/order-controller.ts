import { Request, Response } from "express";
import { prisma } from "../connection/client";

// GET /orders/summary
export const getOrderSummary = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit ?? 10);
    const offset = Number(req.query.offset ?? 0);

    const [rows, distinct] = await prisma.$transaction([
      prisma.order.groupBy({
        by: ["userId"],
        _count: { id: true },
        _sum: { quantity: true },
        orderBy: { _count: { id: "desc" } },
        skip: offset,
        take: limit,
      }),
      prisma.order.findMany({
        distinct: ["userId"],
        select: { userId: true },
      }),
    ]);

    const userIds = rows.map((r) => r.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true },
    });
    const userMap = new Map(users.map((u) => [u.id, u]));

    const data = rows.map((r: any) => ({
      userId: r.userId,
      name: userMap.get(r.userId)?.name ?? null,
      email: userMap.get(r.userId)?.email ?? null,
      totalOrders: r._count?.id ?? 0,
      totalQuantity: r._sum?.quantity ?? 0,
    }));

    return res.json({
      data,
      total: distinct.length,
      limit,
      offset,
    });
  } catch (err) {
    console.error("getOrderSummary error:", err);
    return res.status(500).json({ error: "Failed to fetch order summary" });
  }
};
