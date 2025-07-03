import { Router } from "express";
import { requireAuth } from "../auth/auth";
import cookieParser from "cookie-parser";
export const router = Router();

router.use(cookieParser());
router.use(requireAuth);
