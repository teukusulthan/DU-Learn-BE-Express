import express from "express";
import { getOrderSummary } from "../controllers/order-controller";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controller";

const router = express.Router();

// PRODUCTS
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", createProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

// ORDERS SUMMARY
router.get("/orders/summary", getOrderSummary);

export default router;
