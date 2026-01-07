import type { Request, Response } from "express";
import prisma from "../../prisma";
import bcrypt from "bcryptjs";
import signJwtAndSetCookie from "./signJwtAndSetCookie";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ message: "Wrong Email", type: "email" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ message: "Invalid credentials", type: "password" });
    return;
  }

  signJwtAndSetCookie(res, user);
  res.json({ id: user.id, email: user.email, userName: user.userName });
};
