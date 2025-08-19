import { Request, Response } from "express";
import { cartItems } from "../models/cart-model";
import { products } from "../models/product-model";

//GET
export const getCart = (_req: Request, res: Response) => {
  const items = cartItems.map((it) => {
    const p = products.find((x) => x.id === it.productId);
    return {
      productId: it.productId,
      name: p?.name ?? "(deleted product)",
      quantity: it.quantity,
      subtotal: (p?.price ?? 0) * it.quantity,
    };
  });

  const total = items.reduce((s, it) => s + it.subtotal, 0);

  res.json({ items, total });
};

//POST
export const addItem = (req: Request, res: Response) => {
  const { productId, quantity } = req.body as {
    productId?: number;
    quantity?: number;
  };

  if (
    typeof productId !== "number" ||
    !Number.isInteger(quantity!) ||
    quantity! <= 0
  )
    return res
      .status(400)
      .json({
        message: "productId number & quantity positive integer required",
      });

  const p = products.find((x) => x.id === productId);
  if (!p) return res.status(400).json({ message: "Product not found" });

  const existing = cartItems.find((c) => c.productId === productId);

  if (existing) {
    existing.quantity += quantity!;
    return res.status(201).json(existing);
  }

  const item = { productId, quantity: quantity! };
  cartItems.push(item);
  res.status(201).json(item);
};

export const updateItem = (
  req: Request<{ productId: string }>,
  res: Response
) => {
  const productId = parseInt(req.params.productId, 10);
  const { quantity } = req.body as { quantity?: number };

  if (!Number.isInteger(quantity!) || quantity! <= 0)
    return res
      .status(400)
      .json({ message: "quantity must be positive integer" });

  const item = cartItems.find((c) => c.productId === productId);
  if (!item) return res.status(404).json({ message: "Item not found in cart" });

  item.quantity = quantity!;
  res.json(item);
};

export const deleteItem = (
  req: Request<{ productId: string }>,
  res: Response
) => {
  const productId = parseInt(req.params.productId, 10);

  const i = cartItems.findIndex((c) => c.productId === productId);
  if (i === -1)
    return res.status(404).json({ message: "Item not found in cart" });

  const deleted = cartItems.splice(i, 1)[0];
  res.json(deleted);
};

export const clearCart = (_req: Request, res: Response) => {
  cartItems.length = 0;
  res.json({ message: "Cart cleared" });
};
