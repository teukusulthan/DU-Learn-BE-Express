import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch datas" });
  }
};
