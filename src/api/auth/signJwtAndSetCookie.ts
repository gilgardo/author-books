import type { Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const signJwtAndSetCookie = (res: Response, id: number) => {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true });
};

export default signJwtAndSetCookie;
