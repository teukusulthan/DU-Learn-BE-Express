import { Request, Response } from "express";
import { prisma } from "../connection/client";
import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3),
  price: Joi.number().min(0),
  stock: Joi.number().integer().min(0),
}).min(1);

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json({
    code: 200,
    status: "success",
    message: "Products fetched succesfully",
    data: products,
  });
};

export const createProduct = async (req: Request, res: Response) => {
  const { error, value } = createSchema.validate(req.body);
  if (error) {
    const e: any = new Error(error.message);
    e.statusCode = 400;
    throw e;
  }

  const supplierId = Number((req as any).user?.id);

  const { name, price, stock } = req.body;

  const newProduct = await prisma.product.create({
    data: { name, price, stock, supplierId: supplierId },
  });

  res.status(201).json({
    code: 201,
    status: "success",
    message: "Product created successfully",
    data: newProduct,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { name, price, stock } = req.body as {
    name?: string;
    price?: number;
    stock?: number;
  };

  const { error, value } = updateSchema.validate(req.body);
  if (error) {
    const e: any = new Error(error.message);
    e.statusCode = 400;
    throw e;
  }

  const updated = await prisma.product.update({ where: { id }, data: value });
  res.json({
    code: 200,
    status: "success",
    message: "Product updated",
    data: updated,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.product.delete({ where: { id } });
  res.json({
    code: 200,
    status: "success",
    message: "Product deleted",
    data: { id },
  });
};
