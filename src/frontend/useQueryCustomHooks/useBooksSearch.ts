import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { maxResults } from "../../data/maxResults";
import type { Volume } from "../../types/googleApi";
import { useEffect } from "react";
import api from "../../utils/api";
const searchBooks = async (
  query: string,
  page: number,
  signal: AbortSignal
) => {
  const { data } = await api.get(
    `/books/search?q=${encodeURIComponent(query)}&startIndex=${
      page * maxResults
    }`,
    {
      signal,
    }
  );

  return data as Volume[];
};

export function getBooksSearchQueryOptions(query: string, page: number) {
  return queryOptions({
    queryKey: ["books", "search", { query, page }],
    queryFn: ({ signal }) => searchBooks(query, page, signal),
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
