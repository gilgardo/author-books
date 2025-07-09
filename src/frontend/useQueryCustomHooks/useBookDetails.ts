import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooksSearchQueryOptions } from "./useBooksSearch";
import api from "../../utils/api";
import type { OpenLibraryWork } from "@/types/openLibrary";

const searchBook = async (key: string) => {
  const { data } = await api.get(`/book?key=${encodeURIComponent(key)}`);

  return data as OpenLibraryWork;
};

export function getBookDetailsQueryOptions(key: string) {
  return queryOptions({
    queryKey: ["book", { key }],
    queryFn: () => searchBook(key),
    staleTime: 100,
  });
}

export const useBookDetails = (key: string, query = "", page = 0) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...getBookDetailsQueryOptions(key),
    placeholderData: () => {
      if (query === "") return undefined;
      const searchData = queryClient
        .getQueryData(getBooksSearchQueryOptions(query, page).queryKey)
        ?.docs.find((dock) => dock.key === key);
      if (!searchData) return undefined;
      return {
        title: searchData.title,
        covers: searchData.cover_i ? [searchData.cover_i] : undefined,
        key: searchData?.key,
        authors: searchData.author_key?.[0]
          ? [
              {
                author: { key: searchData.author_key[0] },
                type: { key: "/type/author_role" },
              },
            ]
          : undefined,
        type: { key: "/type/work" },
      };
    },
  });
};
