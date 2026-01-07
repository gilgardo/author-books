import type { Request, Response } from "express";
import prisma from "../../prisma";
import bcrypt from "bcryptjs";

import signJwtAndSetCookie from "./signJwtAndSetCookie";

export const signUp = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body;
  if (!email || !password || !userName) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
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
  await prisma.library.create({ data: { name: "My Books", userId: user.id } });
  res.json({ id: user.id, email: user.email, userName: user.userName });
};
