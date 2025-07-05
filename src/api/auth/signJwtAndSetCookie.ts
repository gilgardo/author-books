import type { Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const signJwtAndSetCookie = (res: Response, user: User) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, userName: user.userName },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

export default signJwtAndSetCookie;
