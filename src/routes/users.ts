import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users";

const router = Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.post("/users", createUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
