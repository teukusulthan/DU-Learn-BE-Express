import { Request, Response } from "express";
import { prisma } from "../connection/client";
import { request } from "http";

export const transferPoints = async (req: Request, res: Response) => {
  const { amount, senderId, receiverId } = req.body;

  try {
    if (amount <= 0) {
      res.status(400).json({ message: "number of points must be more than 0" });
    }

    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: senderId } }),
      prisma.user.findUnique({ where: { id: receiverId } }),
    ]);

    if (!sender) {
      res.status(400).json({ message: "Sender not found" });
      return;
    }
    if (!receiver) {
      res.status(400).json({ message: "Receiver not found" });
      return;
    }

    if ((sender?.points ?? 0) < amount) {
      res
        .status(400)
        .json({ message: "Sender's points are not enough to make a transfer" });
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: senderId },
        data: { points: { decrement: amount } },
      });
    });

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: receiverId },
        data: { points: { increment: amount } },
      });
    });
    res.status(200).json({
      message: "points transferred successfully",
      data: { senderId, receiverId, amount },
    });
  } catch (error) {}
};

export const userPoints = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const userPoints = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, points: true },
    });

    res.status(200).json({ message: "Data found", data: userPoints });
  } catch (error) {
    console.error("Error fetching user points:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
