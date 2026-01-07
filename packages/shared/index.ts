// Data exports
export { maxResults } from "./data/maxResults.js";

// Schema exports
export { OpenLibrarySearchDocSchema } from "./schema/OpenLibrarySearchDocSchema.js";

// Type exports
export type {
  OpenLibrarySearchDoc,
  OpenLibrarySearchResponse,
  OpenLibraryWork,
  OpenLibraryEdition,
} from "./types/openLibrary.js";
export type { bookT, authorT } from "./types/author.js";
export type {
  Volume,
  VolumeInfo,
  IndustryIdentifier,
  SaleInfo,
  Price,
  AccessInfo,
  SearchInfo,
} from "./types/googleApi.js";
export type { BooksSearchParams, BookDetailsParams } from "./types/params.js";
