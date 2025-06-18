import { useQuery } from "@tanstack/react-query";
import { maxResults } from "../../data/maxResults";
import { BASE_URL } from "../../data";
import type { Volume } from "../../types/googleApi";

const searchBooks = async (query: string, page: number) => {
  const res = await fetch(
    `${BASE_URL}/books/search?q=${encodeURIComponent(query)}&startIndex=${
      page * maxResults
    }`
  );
  if (!res.ok) throw new Error("bad request");
  const data = await res.json();
  return data as Volume[];
};

export const useBooksSearch = (query: string, page: number) => {
  return useQuery({
    queryKey: ["books/search", query, page],
    queryFn: () => searchBooks(query, page),
    enabled: query !== "",
    staleTime: 10 * 1000,
    placeholderData: (previousData) => previousData,
  });
};
