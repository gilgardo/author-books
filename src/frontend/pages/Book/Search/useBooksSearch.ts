import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "../../../../utils/api";
import type { OpenLibrarySearchResponse } from "@/types/openLibrary";
const searchBooks = async (q: string, page: number, signal: AbortSignal) => {
  const { data } = await api.get(`/book/search`, {
    params: { q, page },
    signal,
  });

  return data as OpenLibrarySearchResponse;
};

export function getBooksSearchQueryOptions(q: string, page: number) {
  return queryOptions({
    queryKey: ["book", "search", { q, page }],
    queryFn: ({ signal }) => searchBooks(q, page + 1, signal),
    enabled: !!q,
    staleTime: 60 * 1000,
  });
}

export const useBooksSearch = (q: string, page: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (q === "") return;
    queryClient.prefetchQuery(getBooksSearchQueryOptions(q, page + 1));
    if (page > 1) {
      queryClient.prefetchQuery(getBooksSearchQueryOptions(q, page - 1));
    }
  }, [queryClient, q, page]);

  return useQuery({
    ...getBooksSearchQueryOptions(q, page),
    placeholderData: (previousData) => previousData,
  });
};
