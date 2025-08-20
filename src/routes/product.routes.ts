import express from "express";
import { getProducts } from "../controllers/product-controller";

const router = express.Router();

router.get("/products", getProducts);

export default router;
