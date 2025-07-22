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
router.get("/", optionalAuth, (req: JWTRequest, res: Response) => {
  res.json({ user: req.auth ?? null });
});
router.use(requireAuth);
router.get("/libraries", async (req: JWTRequest, res: Response) => {
  const { id: userId } = req.auth!;
  const libraries = await prisma.library.findMany({
    where: { userId: Number(userId) },
  });
  res.json(libraries);
});

router.get("/libraries/:id", async (req: JWTRequest, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(400).json({ error: "Missing or invalid parameter `libraryId`" });
    return;
  }

  try {
    const library = await prisma.library.findUniqueOrThrow({
      where: { id },
      include: {
        books: true,
      },
    });

    res.json(library);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Library not found" });
  }
});

router.post("/libraries", async (req: JWTRequest, res: Response) => {
  const { id: userId } = req.auth!;
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    res
      .status(400)
      .json({ error: "Missing or invalid parameter library name" });
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

router.post("/libraries/:id", async (req: JWTRequest, res: Response) => {
  const { id: userId } = req.auth!;
  const libraryId = Number(req.params.id);
  const { book }: { book: Prisma.BookCreateInput } = req.body;

  if (!book) {
    res.status(400).json({ error: "Missing or invalid body" });
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
