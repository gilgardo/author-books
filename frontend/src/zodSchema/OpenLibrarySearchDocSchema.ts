import { z } from "zod";

export const OpenLibrarySearchDocSchema = z
  .object({
    author_key: z.array(z.string()),
    author_name: z.array(z.string()),
    cover_edition_key: z.string().optional(),
    cover_i: z.number().optional(),
    ebook_access: z.enum(["borrowable", "public"]).optional(),
    edition_count: z.number(),
    first_publish_year: z.number().optional(),
    has_fulltext: z.boolean(),
    ia: z.array(z.string()).optional(),
    ia_collection_s: z.string().optional(),
    key: z.string(),
    language: z.array(z.string()).optional(),
    lending_edition_s: z.string().optional(),
    lending_identifier_s: z.string().optional(),
    public_scan_b: z.boolean(),
    title: z.string(),
  })
  .strip();
