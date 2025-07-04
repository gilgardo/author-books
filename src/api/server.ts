import express from "express";
import { router as booksRouter } from "./routes/books.ts";
import { router as bookRouter } from "./routes/book.ts";
import { router as authRouter } from "./auth/auth.ts";
import { router as userRouter } from "./routes/user.ts";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/books/search", booksRouter);
app.use("/api/book", bookRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.get("/csrf-token", (req, res) => {
  console.log(req.csrfToken());
  res.json({ csrfToken: req.csrfToken() });
});
app.use((err: Error, _: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
