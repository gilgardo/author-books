import express from "express";
import { router as bookRouter } from "./routes/book.js";
import { router as authRouter } from "./auth/auth.js";
import { router as userRouter } from "./routes/user.js";
import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import csrf from "csurf";
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
app.use(cookieParser());

app.use("/api/book", bookRouter);
app.use("/api/auth", authRouter);
const csrfProtection = csrf({
  cookie: true,
});

app.use("/api/user", csrfProtection, userRouter);
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
