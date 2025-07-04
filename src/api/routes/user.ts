import { Router } from "express";
import { optionalAuth, requireAuth } from "../auth/auth";
import cookieParser from "cookie-parser";
import type { Request as JWTRequest } from "express-jwt";
import type { Response } from "express";

import csrf from "csurf";

export const router = Router();

const csrfProtection = csrf({
  cookie: true,
});
router.use(cookieParser());
router.use(csrfProtection);
router.get("/", optionalAuth, (req: JWTRequest, res: Response) => {
  res.json({ user: req.auth ?? null });
});
router.use(requireAuth);
