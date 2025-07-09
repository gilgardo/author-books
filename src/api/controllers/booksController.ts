import type { Request, Response } from "express";
import { maxResults } from "../../data/maxResults.ts";
import { axiosWithUserAgent } from "../customAxios.ts";

const BASE_URL = "https://openlibrary.org/search.json";

export async function searchBooks(req: Request, res: Response) {
  const { q, page = "1", resultsNr = maxResults } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }
  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(
      q.toString()
    )}&page=${page}&limit=${resultsNr}`;

    const response = await axiosWithUserAgent.get(url);
    console.log("Status:", response.status);
    console.log("Headers:", response.headers);
    // console.log("Data (start):", response.data?.slice?.(0, 200)); // Optional

    res.json(response.data);
  } catch (err) {
    console.error("Axios error:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
}
