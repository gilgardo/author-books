import { Router, type RequestHandler } from "express";
import { searchBooks } from "../controllers/booksController.ts";

export const router = Router();
router.get("/", searchBooks as RequestHandler);
