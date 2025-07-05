import type { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import signJwtAndSetCookie from "./signJwtAndSetCookie";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return res.status(401).json({ message: "Wrong Email", type: "email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res
      .status(401)
      .json({ message: "Invalid credentials", type: "password" });

  signJwtAndSetCookie(res, user);
  res.json({ id: user.id, email: user.email, userName: user.userName });
};
