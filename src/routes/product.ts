import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";
import { authenticate } from "../middlewares/auth";
import { requireRole } from "../middlewares/authorization";
import { canUpdateProduct } from "../middlewares/canUpdateProduct";

const router = express.Router();

// PUBLIC
router.get("/", getProducts);

// SUPPLIER ONLY
router.post("/add", authenticate, requireRole("SUPPLIER"), createProduct);

// SUPPLIER / ADMIN
router.put(
  "/:id",
  authenticate,
  requireRole("SUPPLIER", "ADMIN"),
  canUpdateProduct,
  updateProduct
);
router.delete(
  "/:id",
  authenticate,
  requireRole("SUPPLIER", "ADMIN"),
  canUpdateProduct,
  deleteProduct
);

export default router;
