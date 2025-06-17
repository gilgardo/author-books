import { Router, type RequestHandler } from "express";
import { searchBooks } from "../controllers/booksControllers.ts";

export const router = Router();
router.get("/", searchBooks as RequestHandler);
