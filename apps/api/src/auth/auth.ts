import { Router } from "express";
import { signUp } from "./signUpController.js";
import { expressjwt, type Request as JWTRequest } from "express-jwt";
import csrf from "csurf";
import { signIn } from "./signInController.js";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const router = Router();

const getTokenFromCookie = (req: Request) => {
  if (req.cookies?.token) {
    return req.cookies.token;
  }
  return null;
};

export const optionalAuth = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  getToken: getTokenFromCookie,
  credentialsRequired: false,
});

export const requireAuth = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  getToken: getTokenFromCookie,
  credentialsRequired: true,
});

router.post("/signUp", signUp);
router.post("/signIn", signIn);

router.get("/me", optionalAuth, (req: JWTRequest, res: Response) => {
  res.json(req.auth ? req.auth : null);
});

const csrfProtection = csrf({
  cookie: true,
});

router.use(csrfProtection);

router.get("/csrf_token", csrfProtection, (req, res) => {
  console.log(req.csrfToken());
  res.json({ csrfToken: req.csrfToken() });
});

router.post("/logout", requireAuth, (_, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
});
