import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth";
import { registerSchema, loginSchema } from "../validation/auth";

export async function handleRegister(req: Request, res: Response) {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    const e: any = new Error(error.message);
    e.statusCode = 400;
    throw e;
  }

  if (!req.file) {
    const e: any = new Error("No file uploaded");
    e.statusCode = 400;
    throw e;
  }

  const { email, password } = (req.body ?? {}) as {
    email?: string;
    password?: string;
  };
  if (!email || !password) {
    const e: any = new Error("Email and password are required");
    e.statusCode = 400;
    throw e;
  }

  const profile = req.file?.filename;

  const user = await registerUser(email, password, profile);
  res.status(201).json({
    code: 201,
    status: "success",
    message: "User registered",
    data: user,
  });
}

export async function handleLogin(req: Request, res: Response) {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const e: any = new Error(error.message);
    e.statusCode = 400;
    throw e;
  }

  const { email, password } = (req.body ?? {}) as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    const e: any = new Error("Email and password are required");
    e.statusCode = 400;
    throw e;
  }

  const { token } = await loginUser(email, password);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    })
    .status(200)
    .json({
      code: 200,
      status: "success",
      message: "Login success",
      data: { token },
    });
}
