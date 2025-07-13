import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "../../../../utils/api";
import type { OpenLibrarySearchResponse } from "@/types/openLibrary";
import bookKeys from "../bookKeys";
const searchDocs = async (q: string, page: number, signal: AbortSignal) => {
  const { data } = await api.get(`/book/search`, {
    params: { q, page },
    signal,
  });

  return data as OpenLibrarySearchResponse;
};

export function getDocsSearchQueryOptions(q: string, page: number) {
  return queryOptions({
    queryKey: bookKeys.docs(q, page),
    queryFn: ({ signal }) => searchDocs(q, page + 1, signal),
    enabled: !!q,
  });
}

export const useDocsSearch = (q: string, page: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (q === "") return;
    queryClient.prefetchQuery(getDocsSearchQueryOptions(q, page + 1));
    if (page > 1) {
      queryClient.prefetchQuery(getDocsSearchQueryOptions(q, page - 1));
    }
  }, [queryClient, q, page]);

  return useQuery({
    ...getDocsSearchQueryOptions(q, page),
    placeholderData: (previousData) => previousData,
  });
};
