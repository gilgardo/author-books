import { Router, type RequestHandler } from "express";
import { searchBook } from "../controllers/bookController";

export const router = Router();
router.use(function (_, res, next) {
  res.setHeader(
    "User-Agent",
    "Author-books/1.0 (alessandro.foresta.dev@gmail.com)"
  );
  next();
});
router.get("/", searchBook as RequestHandler);
