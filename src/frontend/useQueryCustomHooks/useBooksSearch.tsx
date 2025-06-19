import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { maxResults } from "../../data/maxResults";
import { BASE_URL } from "../../data";
import type { Volume } from "../../types/googleApi";
import { useEffect } from "react";

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

export function getBooksSearchQueryOptions(query: string, page: number) {
  return queryOptions({
    queryKey: ["books/search", query, page],
    queryFn: () => searchBooks(query, page),
    enabled: query !== "",
    staleTime: 60 * 1000,
  });
}

export const useBooksSearch = (query: string, page: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(getBooksSearchQueryOptions(query, page + 1));
  }, [queryClient, query, page]);

  return useQuery({
    ...getBooksSearchQueryOptions(query, page),
    placeholderData: (previousData) => previousData,
  });
};
