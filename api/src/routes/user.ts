import { Router } from "express";
import { requireAuth } from "../auth/auth";
import type { Request as JWTRequest } from "express-jwt";
import type { Response } from "express";
import prisma from "../../prisma";
import { maxResults } from "@/data/maxResults";
import type { OpenLibrarySearchDoc } from "@/types/openLibrary";
import { OpenLibrarySearchDocSchema } from "@/frontend/zodSchema/OpenLibrarySearchDocSchema";

export const router = Router();

router.use(requireAuth);

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
router.get("/libraries/id/:id", async (req: JWTRequest, res: Response) => {
  const { id: userId } = req.auth!;
  const libraryId = Number(req.params.id);
  const page = Number(req.query.page) || 0;
  const limit = maxResults;

  const library = await prisma.library.findUnique({
    where: {
      id: libraryId,
      userId: Number(userId),
    },
  });

  if (!library) {
    res.status(404).json({ message: "Library not found" });
    return;
  }

  const books = await prisma.book.findMany({
    where: {
      libraryId: libraryId,
    },
    skip: page * limit,
    take: limit,
    orderBy: {
      title: "asc",
    },
  });

  const total = await prisma.book.count({
    where: {
      libraryId: libraryId,
    },
  });

  res.json({
    data: books,
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  });
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
    include: { books: true },
  });
  res.status(201).json(library);
});

router.post("/libraries/id/:id", async (req: JWTRequest, res: Response) => {
  const { id: userId } = req.auth!;
  const libraryId = Number(req.params.id);
  const { book }: { book: OpenLibrarySearchDoc } = req.body;

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

  let cleanedBook: OpenLibrarySearchDoc | undefined;

  try {
    cleanedBook = OpenLibrarySearchDocSchema.parse(book);
  } catch (err) {
    console.log(book, err);
    res.status(400).json({ message: "Invalid book data", error: err });
    return;
  }
  if (!cleanedBook) return;
  const createdBook = await prisma.book.create({
    data: { ...cleanedBook, library: { connect: { id: libraryId } } },
  });

  res.status(201).json(createdBook);
});
