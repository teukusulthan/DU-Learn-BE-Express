import { Request, Response } from "express";
import { prisma } from "../connection/client";

// GET /users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({ include: { posts: true } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

//GET /users/:id
export const getUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// POST /users
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({ data: { name, email } });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// PATCH /user/:id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body as { name?: string; email?: string };

    const updated = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

//DELETE /user/:id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ messages: "User Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
