import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
} from "../controllers/product-controller";

const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", createProduct);

export default router;
