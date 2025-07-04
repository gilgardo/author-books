import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Volume } from "../../types/googleApi";
import { getBooksSearchQueryOptions } from "./useBooksSearch";
import api from "../../utils/api";

const searchBook = async (id: string) => {
  const { data } = await api.get(`/book?id=${encodeURIComponent(id)}`, {
    method: "GET",
  });

  return data as Volume;
};

export function getBookDetailsQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["book", { id }],
    queryFn: () => searchBook(id),
    staleTime: 60 * 1000,
  });
}

export const useBookDetails = (id: string, query = "", page = 0) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...getBookDetailsQueryOptions(id),
    initialData: () => {
      if (query === "") return undefined;
      return queryClient
        .getQueryData(getBooksSearchQueryOptions(query, page).queryKey)
        ?.find((book) => book.id === id);
    },
  });
};
