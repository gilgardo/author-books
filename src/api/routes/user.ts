import { Router } from "express";
import { optionalAuth, requireAuth } from "../auth/auth";
import cookieParser from "cookie-parser";
import type { Request as JWTRequest } from "express-jwt";
import type { Response } from "express";

import csrf from "csurf";
import prisma from "../prisma";
import type { Prisma } from "@prisma/client";

export const router = Router();

const csrfProtection = csrf({
  cookie: true,
});
router.use(cookieParser());
router.use(csrfProtection);
router.get("/logged", optionalAuth, (req: JWTRequest, res: Response) => {
  res.json(req.auth ? req.auth : null);
});
router.use(requireAuth);
router.post("/logout", (_, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/libraries", async (req: JWTRequest, res: Response) => {
  const { id: userId } = req.auth!;
  const libraries = await prisma.library.findMany({
    where: { userId: Number(userId) },
    include: {
      books: true,
    },
  });
  res.json(libraries);
});

router.post("/libraries", async (req: JWTRequest, res: Response) => {
  const { id: userId } = req.auth!;
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    res
      .status(400)
      .json({ message: "Missing or invalid parameter library name" });
    return;
  }
  const existing = await prisma.library.findUnique({
    where: {
      userId_name: {
        userId: Number(userId),
        name,
      },
    },
  });

  if (existing) {
    res.status(409).json({ message: "Library already exists", type: "name" });
    return;
  }
  const library = await prisma.library.create({
    data: {
      name,
      userId,
    },
  });
  res.status(201).json(library);
});

router.post("/libraries/id/:id", async (req: JWTRequest, res: Response) => {
  const { id: userId } = req.auth!;
  const libraryId = Number(req.params.id);
  const { book }: { book: Prisma.BookCreateInput } = req.body;

  if (!book) {
    res.status(400).json({ message: "Missing or invalid body" });
    return;
  }

  const library = await prisma.library.findUnique({
    where: { id: libraryId },
  });

  if (!library || library.userId !== Number(userId)) {
    res.status(403).json({ message: "Unauthorized or invalid library ID" });
    return;
  }

  const createdBook = await prisma.book.create({
    data: { ...book, library: { connect: { id: libraryId } } },
  });

  res.status(201).json(createdBook);
});
