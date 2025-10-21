import type { Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const signJwtAndSetCookie = (res: Response, user: User) => {
  const { password, ...rest } = user;
  const token = jwt.sign(rest, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

export default signJwtAndSetCookie;
