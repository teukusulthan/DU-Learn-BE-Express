import { Router } from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts";

const router = Router();

router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.post("/posts", createPost);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;
