import express from "express";
import { router as bookRouter } from "./routes/book.js";
import { router as authRouter } from "./auth/auth.js";
import { router as userRouter } from "./routes/user.js";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import { config } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const csrfProtection = csrf({
  cookie: true,
});

app.use("/api/book", bookRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", csrfProtection, userRouter);

// Error handler - must be last middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (config.isProduction) {
    res.status(500).json({ error: "Something went wrong" });
  } else {
    console.error(err.stack);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  if (!config.isProduction) {
    console.log(`Server running on port ${PORT}`);
  }
});
