import { Router } from "express";
import { transferPoints, userPoints } from "../controllers/transfer-points";
import { updateSupplierStock } from "../controllers/suppliers";
const router = Router();

router.post("/transfer-points", transferPoints);
router.get("/user-points/:id", userPoints);
router.post("/suppliers/stock", updateSupplierStock);

export default router;
