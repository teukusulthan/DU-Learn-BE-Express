import { Request, Response } from "express";
import { prisma } from "../connection/client";
import { request } from "http";

// GET /posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// GET /post
export const getPost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.post.findUnique({ where: { id } });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// POST /posts
export const createPost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content, authorId } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: Number(authorId) } },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(200).json({ error: "Failed to add post" });
  }
};

// PATCH /post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content, authorId } = req.body as {
      title?: string;
      content?: string;
      authorId?: number;
    };
    const post = await prisma.post.update({
      where: { id },
      data: { title, content, authorId },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.post.delete({ where: { id } });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
