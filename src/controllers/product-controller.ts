import { Request, Response } from "express";
import { prisma } from "../connection/client";

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
  const { sortBy, order, minPrice, maxPrice, limit, offset } = req.query;

  const filters: any = {};
  if (minPrice) filters.price = { gte: parseFloat(minPrice as string) };
  if (maxPrice) {
    filters.price = {
      ...(filters.price || {}),
      lte: parseFloat(maxPrice as string),
    };
  }

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      take: Number(limit),
      skip: Number(offset),
    });

    const total = await prisma.product.count({ where: filters });
    res.status(200).json({ data: products, total });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch datas" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, price: parseInt(price), stock },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, price, stock } = req.body as {
      name?: string;
      price?: number;
      stock?: number;
    };

    const product = await prisma.product.update({
      where: { id },
      data: { name, price, stock },
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const product = await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
