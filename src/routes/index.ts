import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

import {
  getCart,
  addItem,
  updateItem,
  deleteItem,
  clearCart,
} from "../controllers/cart.controller";

const router = Router();

// PRODUCTS
router.get("/products", getProducts); // /api/v1/products
router.get("/products/:id", getProductById); // /api/v1/products/:id
router.post("/products", createProduct); // /api/v1/products
router.put("/products/:id", updateProduct); // /api/v1/products/:id
router.delete("/products/:id", deleteProduct); // /api/v1/products/:id

// CART
router.get("/cart", getCart); // /api/v1/cart
router.post("/cart/items", addItem); // /api/v1/cart/items
router.put("/cart/items/:productId", updateItem); // /api/v1/cart/items/:productId
router.delete("/cart/items/:productId", deleteItem); // /api/v1/cart/items/:productId
router.delete("/cart", clearCart); // /api/v1/cart

export default router;
