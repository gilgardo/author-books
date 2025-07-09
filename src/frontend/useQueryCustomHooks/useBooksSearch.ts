import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "../../utils/api";
import type { OpenLibrarySearchResponse } from "@/types/openLibrary";
const searchBooks = async (
  query: string,
  page: number,
  signal: AbortSignal
) => {
  const { data } = await api.get(
    `/books/search?q=${encodeURIComponent(query)}&page=${page}`,
    {
      signal,
    }
  );

  return data as OpenLibrarySearchResponse;
};

export function getBooksSearchQueryOptions(query: string, page: number) {
  return queryOptions({
    queryKey: ["books", "search", { query, page }],
    queryFn: ({ signal }) => searchBooks(query, page + 1, signal),
    enabled: query !== "",
    staleTime: 60 * 1000,
  });
}

export const useBooksSearch = (query: string, page: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (query !== "") {
      queryClient.prefetchQuery(getBooksSearchQueryOptions(query, page + 1));
    }
  }, [queryClient, query, page]);

  return useQuery({
    ...getBooksSearchQueryOptions(query, page),
    placeholderData: (previousData) => previousData,
  });
};
