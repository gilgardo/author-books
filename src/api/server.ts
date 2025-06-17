import express from "express";
import { router as booksRouter } from "./routes/books.ts";
import type { Request, Response } from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/books", booksRouter);

app.use((err: Error, _: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
