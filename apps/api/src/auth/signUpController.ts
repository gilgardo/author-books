import type { Request, Response } from "express";
import prisma from "../../prisma.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import signJwtAndSetCookie from "./signJwtAndSetCookie.js";

const signUpSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be 128 characters or less"),
  userName: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be 50 characters or less"),
});

export const signUp = async (req: Request, res: Response) => {
  const parseResult = signUpSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parseResult.error.flatten(),
    });
    return;
  }

  const { email, password, userName } = parseResult.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ message: "User already exists", type: "email" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, userName },
    });
    signJwtAndSetCookie(res, user);
    await prisma.library.create({
      data: { name: "My Books", userId: user.id },
    });
    res.json({ id: user.id, email: user.email, userName: user.userName });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
