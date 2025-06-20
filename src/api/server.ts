import express from "express";
import { router as booksRouter } from "./routes/books.ts";
import { router as bookRouter } from "./routes/book.ts";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/books/search", booksRouter);
app.use("/api/book", bookRouter);
app.use((err: Error, _: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
