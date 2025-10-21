import axios from "axios";
import type { NextFunction, Request, Response } from "express";

export type Params = Record<string, string>;

type ParamEntry =
  | { key: string; isRequired: true; defaultValue?: undefined }
  | { key: string; isRequired: false; defaultValue: string };

type ParamMap = ParamEntry[];

/** Options accepted by `openlibraryProxyHandler` */
interface OpenlibraryProxyOptions {
  /** Error message to return on proxy failure */
  errorMessage: string;
  /** Parameter definition map */
  paramsMap?: ParamMap;
  /** Function that builds the OpenLibrary query URL */
  buildQuery: (queryReq: Params) => string;
  /** Pass data to `next()` instead of responding immediately */
  isNext?: boolean;
}

/**
 * Creates an Express middleware that proxies OpenLibrary requests.
 *
 * @example
 * ```ts
 * app.get(
 *   "/authors",
 *   openlibraryProxyHandler({
 *     errorMessage: "Could not fetch author data",
 *     paramsMap: [
 *       { key: "author", isRequired: true },
 *       { key: "limit", isRequired: false, defaultValue: "20" },
 *     ],
 *     buildQuery: ({ author, limit }) =>
 *       `https://openlibrary.org/search.json?author=${author}&limit=${limit}`,
 *   })
 * );
 * ```
 */
export function openlibraryProxyHandler({
  errorMessage,
  paramsMap = [],
  buildQuery,
  isNext = false,
}: OpenlibraryProxyOptions) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const missing = paramsMap
      .filter(
        ({ key, isRequired, defaultValue }) =>
          isRequired && !(req.query[key] ?? req.params[key]) && !defaultValue
      )
      .map(({ key }) => key);

    if (missing.length) {
      res.status(400).json({ error: "Missing parameters", missing });
      return;
    }

    const params: Params = Object.fromEntries(
      paramsMap.map(({ key, defaultValue }) => {
        const reqValue = (req.query[key] ?? req.params[key])?.toString();
        return [key, reqValue ?? defaultValue?.toString() ?? ""];
      })
    );

    const url = buildQuery(params);

    try {
      const { data } = await axios.get(url, {
        headers: {
          "User-Agent": "Author-books/1.0 (alessandro.foresta.dev@gmail.com)",
          Accept: "application/json",
        },
      });

      if (isNext) {
        res.locals.proxyData = data;
        res.locals.params = params;
        return next();
      }

      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: errorMessage });
    }
  };
}
