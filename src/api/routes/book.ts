import { Router } from "express";
import {
  searchDoc,
  searchEdiction,
  searchDocs,
  searchWork,
} from "../controllers/bookControllers";
import type { OpenLibrarySearchDoc } from "@/types/openLibrary";

export const router = Router();

router.get("/work/:key", searchWork);
router.get("/ediction/:key", searchEdiction);
router.get("/docs", searchDocs);
router.get("/doc/:key", searchDoc, async (_, res): Promise<void> => {
  const { proxyData, params } = res.locals;
  const doc = proxyData?.docs.find((doc: OpenLibrarySearchDoc | undefined) =>
    doc?.key?.includes(params.key)
  );
  if (!doc) {
    res.status(500).json({ error: "Doc not found" });
    return;
  }

  res.json(doc);
});
