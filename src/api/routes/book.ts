import { Router, type RequestHandler } from "express";
import { searchBook } from "../controllers/bookControllers";

export const router = Router();
router.get("/", searchBook as RequestHandler);
