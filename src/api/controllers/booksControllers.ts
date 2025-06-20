import type { Request, Response } from "express";
import dotenv from "dotenv";
import { maxResults } from "../../data/maxResults.ts";
import type { Volume } from "../../types/googleApi.tsx";

dotenv.config();
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_API_KEY;

export async function searchBooks(req: Request, res: Response) {
  const { q, startIndex = "0", resultsNr = maxResults } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(
      q.toString()
    )}&startIndex=${startIndex}&maxResults=${resultsNr}&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Failed to fetch from Google Books API: ${response.status} ${response.statusText} - ${text}`
      );
    }
    const data = await response.json();

    const items: Volume[] = data.items;
    const books = items.filter((item) => item.volumeInfo.printType === "BOOK");
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
}
