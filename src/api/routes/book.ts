import { Router, type RequestHandler } from "express";
import { searchBook } from "../controllers/bookController";

export const router = Router();
router.get("/", searchBook as RequestHandler);
