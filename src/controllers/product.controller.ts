import { Request, Response } from "express";
import { products, Product, genProductId } from "../models/product-model";

// GET
export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

export const getProductById = (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const p = products.find((x) => x.id === id);
  if (!p) return res.status(404).json({ message: "Product not found" });
  res.json(p);
};

//POST
export const createProduct = (req: Request, res: Response) => {
  const { name, price } = req.body as { name?: string; price?: number };

  if (!name || typeof price !== "number")
    return res.status(400).json({ message: "name & price(number) required" });

  const p: Product = { id: genProductId(), name, price };
  products.push(p);
  res.status(201).json(p);
};

//PUT
export const updateProduct = (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const p = products.find((x) => x.id === id);
  if (!p) return res.status(404).json({ message: "Product not found" });

  const { name, price } = req.body as { name?: string; price?: number };

  if (name !== undefined) p.name = name;
  if (price !== undefined) p.price = price;

  res.json(p);
};

//DELETE

export const deleteProduct = (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const i = products.findIndex((x) => x.id === id);
  if (i === -1) return res.status(404).json({ message: "Product not found" });

  const deleted = products.splice(i, 1)[0];
  res.json(deleted);
};
