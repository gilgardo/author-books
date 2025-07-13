import { maxResults } from "@/data/maxResults";
import { openlibraryProxyHandler, type Params } from "../utils/proxieHandler";

const WORK_URL = "https://openlibrary.org/works";
const BOOKS_URL = "https://openlibrary.org/search.json";
const EDICTION_URL = "https://openlibrary.org/books";

export const searchBook = openlibraryProxyHandler(
  "Failed to fetch book",
  [{ key: "key", isRequired: true }],
  (params: Params) => `${WORK_URL}/${params.key}.json`
);

export const searchBooks = openlibraryProxyHandler(
  "Failed to fetch books",
  [
    { key: "q", isRequired: true },
    { key: "page", isRequired: false, defaultValue: "1" },
    { key: "limit", isRequired: false, defaultValue: maxResults.toString() },
  ],
  (params: Params) => {
    const url = new URLSearchParams(params);
    return `${BOOKS_URL}?${url}`;
  }
);

export const searchEdiction = openlibraryProxyHandler(
  "Failed to fetch ediction",
  [{ key: "key", isRequired: true }],
  (params: Params) => `${EDICTION_URL}/${params.key}.json`
);
