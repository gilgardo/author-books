import { maxResults } from "@/data/maxResults";
import { openlibraryProxyHandler, type Params } from "../utils/proxieHandler";

const WORK_URL = "https://openlibrary.org/works";
const DOCS_URL = "https://openlibrary.org/search.json";
const EDICTION_URL = "https://openlibrary.org/books";

export const searchWork = openlibraryProxyHandler({
  errorMessage: "Failed to fetch work",
  paramsMap: [{ key: "key", isRequired: true }],
  buildQuery: (params: Params) => `${WORK_URL}/${params.key}.json`,
});

export const searchDocs = openlibraryProxyHandler({
  errorMessage: "Failed to fetch docs",
  paramsMap: [
    { key: "q", isRequired: true },
    { key: "page", isRequired: false, defaultValue: "1" },
    { key: "limit", isRequired: false, defaultValue: maxResults.toString() },
  ],
  buildQuery: (params: Params) => {
    const url = new URLSearchParams(params);
    return `${DOCS_URL}?${url}`;
  },
});

export const searchDoc = openlibraryProxyHandler({
  errorMessage: "Failed to fetch docs",
  paramsMap: [
    { key: "q", isRequired: true },
    { key: "key", isRequired: true },
    { key: "page", isRequired: false, defaultValue: "1" },
    { key: "limit", isRequired: false, defaultValue: maxResults.toString() },
  ],
  buildQuery: (params: Params) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key, ...rest } = params;
    const url = new URLSearchParams(rest);
    return `${DOCS_URL}?${url}`;
  },
  isNext: true,
});

export const searchEdiction = openlibraryProxyHandler({
  errorMessage: "Failed to fetch ediction",
  paramsMap: [{ key: "key", isRequired: true }],
  buildQuery: (params: Params) => `${EDICTION_URL}/${params.key}.json`,
});
