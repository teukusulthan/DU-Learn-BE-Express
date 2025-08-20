import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../connection/client";
import { error } from "console";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch datas" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch datas" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const product = await prisma.product.create({
      data: { name, price: parseFloat(price) },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price } = req.body as { name?: string; price?: number };

    if (price !== undefined && typeof price !== "number") {
      return res.status(400).json({ error: "Price must be a number" });
    }

    const product = await prisma.product.update({
      where: { id },
      data: { name, price },
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};
