import express from "express";
import { upload } from "../utils/multer";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";
import { authenticate } from "../middlewares/auth";
import { requireRole } from "../middlewares/authorization";
import { canUpdateProduct } from "../middlewares/canUpdateProduct";
import rateLimit from "../middlewares/rateLimiter";

const router = express.Router();

// PUBLIC
router.get("/", getProducts);

// SUPPLIER ONLY
router.post(
  "/add",
  rateLimit,
  authenticate,
  requireRole("SUPPLIER"),
  upload.single("image"),
  createProduct
);

// SUPPLIER / ADMIN
router.put(
  "/:id",
  rateLimit,
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
