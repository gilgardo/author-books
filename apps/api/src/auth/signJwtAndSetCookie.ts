import type { Response } from "express";
import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";
import { config } from "../config/env.js";

const signJwtAndSetCookie = (res: Response, user: User) => {
  const { password, ...rest } = user;
  const token = jwt.sign(rest, config.jwtSecret, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour,
    secure: config.isProduction,
    sameSite: config.isProduction ? "none" : "lax",
  });
};

export default signJwtAndSetCookie;
