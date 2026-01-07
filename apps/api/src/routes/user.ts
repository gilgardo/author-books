import { Router } from "express";
import { requireAuth } from "../auth/auth.js";
import type { Request as JWTRequest } from "express-jwt";
import type { Response } from "express";
import prisma from "../../prisma.js";
import { maxResults } from "@shared/data/maxResults.js";
import type { OpenLibrarySearchDoc } from "@shared/types/openLibrary.js";
import { OpenLibrarySearchDocSchema } from "@shared/schema/OpenLibrarySearchDocSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const router = Router();

router.use(requireAuth);

const MAX_LIBRARY_NAME_LENGTH = 100;
const MAX_PAGE_LIMIT = 100;

router.get(
  "/libraries",
  asyncHandler(async (req: JWTRequest, res: Response) => {
    if (!req.auth?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = Number(req.auth.id);
    const libraries = await prisma.library.findMany({
      where: { userId },
      include: {
        books: true,
      },
    });
    res.json(libraries);
  })
);

router.get(
  "/libraries/id/:id",
  asyncHandler(async (req: JWTRequest, res: Response) => {
    if (!req.auth?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = Number(req.auth.id);
    const libraryId = Number(req.params.id);

    if (isNaN(libraryId)) {
      res.status(400).json({ message: "Invalid library ID" });
      return;
    }

    const page = Math.max(0, Number(req.query.page) || 0);
    const limit = Math.min(maxResults, MAX_PAGE_LIMIT);

    const library = await prisma.library.findUnique({
      where: {
        id: libraryId,
        userId,
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
  })
);

router.post(
  "/libraries",
  asyncHandler(async (req: JWTRequest, res: Response) => {
    if (!req.auth?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = Number(req.auth.id);
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      res
        .status(400)
        .json({ message: "Missing or invalid parameter library name" });
      return;
    }

    if (name.trim().length === 0) {
      res.status(400).json({ message: "Library name cannot be empty" });
      return;
    }

    if (name.length > MAX_LIBRARY_NAME_LENGTH) {
      res.status(400).json({
        message: `Library name must be ${MAX_LIBRARY_NAME_LENGTH} characters or less`,
      });
      return;
    }

    const existing = await prisma.library.findUnique({
      where: {
        userId_name: {
          userId,
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
  })
);

router.post(
  "/libraries/id/:id",
  asyncHandler(async (req: JWTRequest, res: Response) => {
    if (!req.auth?.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = Number(req.auth.id);
    const libraryId = Number(req.params.id);

    if (isNaN(libraryId)) {
      res.status(400).json({ message: "Invalid library ID" });
      return;
    }

    const { book }: { book: OpenLibrarySearchDoc } = req.body;

    if (!book) {
      res.status(400).json({ message: "Missing or invalid body" });
      return;
    }

    const library = await prisma.library.findUnique({
      where: { id: libraryId },
    });

    if (!library || library.userId !== userId) {
      res.status(403).json({ message: "Unauthorized or invalid library ID" });
      return;
    }

    const parseResult = OpenLibrarySearchDocSchema.safeParse(book);

    if (!parseResult.success) {
      res.status(400).json({
        message: "Invalid book data",
        errors: parseResult.error.flatten(),
      });
      return;
    }

    const createdBook = await prisma.book.create({
      data: { ...parseResult.data, library: { connect: { id: libraryId } } },
    });

    res.status(201).json(createdBook);
  })
);
