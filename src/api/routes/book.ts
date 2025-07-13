import { Router, type RequestHandler } from "express";
import {
  searchBook,
  searchEdiction,
  searchBooks,
} from "../controllers/bookControllers";

export const router = Router();
router.use(function (_, res, next) {
  res.setHeader(
    "User-Agent",
    "Author-books/1.0 (alessandro.foresta.dev@gmail.com)"
  );
  next();
});
router.get("/work", searchBook as RequestHandler);
router.get("/ediction", searchEdiction as RequestHandler);
router.get("/work", searchBooks as RequestHandler);
