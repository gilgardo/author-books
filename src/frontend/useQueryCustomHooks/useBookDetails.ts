import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../data";
import type { Volume } from "../../types/googleApi";
import { getBooksSearchQueryOptions } from "./useBooksSearch";

const searchBook = async (id: string) => {
  const res = await fetch(`${BASE_URL}/book?id=${encodeURIComponent(id)}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("bad request");
  const data = await res.json();
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
