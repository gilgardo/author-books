import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_API_KEY;

export async function searchBook(req: Request, res: Response) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }

  try {
    const url = `${BASE_URL}/${encodeURIComponent(
      id.toString()
    )}?key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Failed to fetch from Google Books API: ${response.status} ${response.statusText} - ${text}`
      );
    }

    const data = await response.json();
    res.json(data.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch book" });
  }
}
