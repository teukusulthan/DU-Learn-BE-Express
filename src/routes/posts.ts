import { Router } from "express";
import {
  getPosts,
  getPostComments,
  getPostsCommentsSummary,
} from "../controllers/posts";

const router = Router();

router.get("/posts", getPosts);
router.get("/posts/comments-summary", getPostsCommentsSummary);
router.get("/posts/:id/comments", getPostComments);

export default router;
