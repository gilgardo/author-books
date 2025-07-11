import type { Request, Response } from "express";
import { maxResults } from "../../data/maxResults.ts";
import { axiosWithUserAgent } from "../utils/customAxios.ts";

const BASE_URL = "https://openlibrary.org/search.json";

export async function searchBooks(req: Request, res: Response) {
  const { q, page = "1" } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }
  try {
    const response = await axiosWithUserAgent.get(BASE_URL, {
      params: { q, page, limit: maxResults },
    });
    console.log("Status:", response.status);
    console.log("Headers:", response.headers);
    res.json(response.data);
  } catch (err) {
    console.error("Axios error:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
}
