import { Router } from "express";
import { signUp } from "./signUpController.js";
import { expressjwt, type Request as JWTRequest } from "express-jwt";
import csrf from "csurf";
import { signIn } from "./signInController.js";
import type { Request, Response } from "express";
import { config } from "../config/env.js";

export const router = Router();

const getTokenFromCookie = (req: Request) => {
  if (req.cookies?.token) {
    return req.cookies.token;
  }
  return null;
};

export const optionalAuth = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  getToken: getTokenFromCookie,
  credentialsRequired: false,
});

export const requireAuth = expressjwt({
  secret: config.jwtSecret,
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
  res.json({ csrfToken: req.csrfToken() });
});

router.post("/logout", requireAuth, (_, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? "none" : "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
});
