import type { Request, Response } from "express";
import { axiosWithUserAgent } from "../customAxios";

const BASE_URL = "https://openlibrary.org";

export async function searchBook(req: Request, res: Response) {
  const { key } = req.query;
  if (!key) {
    return res.status(400).json({ error: "Missing key" });
  }
  const replacedKey = encodeURIComponent(key.toString()).replace("%2F", "/");

  try {
    const url = `${BASE_URL}${replacedKey}.json`;

    const response = await axiosWithUserAgent.get(url);

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch book" });
  }
}
