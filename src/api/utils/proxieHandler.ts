import type { NextFunction, Request, Response } from "express";
import { axiosWithUserAgent } from "./customAxios";

export type Params = Record<string, string>;
type ParamEntry =
  | { key: string; isRequired: true; defaultValue?: undefined }
  | { key: string; isRequired: false; defaultValue: string };
type ParamMap = ParamEntry[];

export function proxyHandler(
  errorMessage: string,
  paramsMap: ParamMap = [],
  buildQuery: (queryReq: Params) => string,
  isNext: boolean = false
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const missing = paramsMap
      .filter(
        ({ key, isRequired, defaultValue }) =>
          isRequired && !req.query[key] && !defaultValue
      )
      .map(({ key }) => key);

    if (missing.length)
      return res.status(400).json({ error: "Missing parameters", missing });

    const params = Object.fromEntries(
      paramsMap.map(({ key, defaultValue }) => {
        const reqValue = req.query[key]?.toString();
        if (reqValue) return [key, reqValue];
        const value = defaultValue?.toString() ?? "";
        return [key, value];
      })
    );

    const url = buildQuery(params);

    try {
      const { data } = await axiosWithUserAgent.get(url);
      if (isNext) {
        res.locals.proxyData = data;
        return next();
      }
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: errorMessage });
    }
  };
}
