import bcrypt from "bcrypt";
import { prisma } from "../connection/client";
import { signToken } from "../utils/jwt";
import { error } from "console";

// Register
export async function registerUser(email: string, password: string) {
  if (!email.match(/@/) || password.length < 6) {
    throw new Error(
      "Invalid input: email must contain '@' and password must be at least 6 characters long."
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  return { id: user.id, email: user.email };
}

// Login
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Wrong password");
  }

  const token = signToken({ id: user.id, role: user.role });
  return { token };
}
