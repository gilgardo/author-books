import {
  QueryClient,
  queryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getBooksSearchQueryOptions } from "./useBooksSearch";
import api from "../../utils/api";
import type { OpenLibrarySearchResponse } from "../../types/openLibrary";

const searchDoc = async (
  q: string,
  page: number,
  key: string,
  signal: AbortSignal
) => {
  const { data } = await api.get<OpenLibrarySearchResponse>(`/books/search`, {
    params: { q, page },
    signal,
  });

  return data.docs.find((doc) => doc.key.includes(key));
};

export function getDocQueryOptions(
  key: string,
  queryClient: QueryClient,
  q: string,
  page: number
) {
  return {
    ...queryOptions({
      queryKey: ["book", "doc", { q, page }],
      queryFn: ({ signal }) => searchDoc(q, page + 1, key, signal),
      enabled: q !== "",
      staleTime: 60 * 1000,
    }),
    placeholderData: () => {
      if (q === "") return undefined;
      return queryClient
        .getQueryData(getBooksSearchQueryOptions(q, page).queryKey)
        ?.docs.find((doc) => doc.key.includes(key));
    },
  };
}

export const useDocSearch = (q: string, page: number, key: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...getDocQueryOptions(key, queryClient, q, page),
  });
};
