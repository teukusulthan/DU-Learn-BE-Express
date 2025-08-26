import express from "express";
import { handleRegister, handleLogin } from "../controllers/auth";
import { authenticate } from "../middlewares/auth";
import { upload } from "../utils/multer";
import rateLimit from "../middlewares/rateLimiter";

const router = express.Router();

router.post("/register", rateLimit, upload.single("profile"), handleRegister);
router.post("/login", handleLogin);

router.get("/me", authenticate, (_req, res) =>
  res.json({ message: "Protected route" })
);

export default router;
