import type { Request, Response } from "express";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_API_KEY;

export async function searchBooks(req: Request, res: Response) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(
      q.toString()
    )}&key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch from Google Books API");
    }

    const data = await response.json(); // ✅ parse the actual JSON data
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
}
