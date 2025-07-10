import {
  QueryClient,
  queryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getBooksSearchQueryOptions } from "./useBooksSearch";
import api from "../../utils/api";
import type { OpenLibraryWork } from "@/types/openLibrary";

const searchWork = async (key: string) => {
  const { data } = await api.get(`/book`, { params: { key } });

  return data as OpenLibraryWork;
};

export function getWorkQueryOptions(
  key: string,
  queryClient: QueryClient,
  q?: string,
  page?: number
) {
  return queryOptions({
    queryKey: ["book", { key }],
    queryFn: () => searchWork(key),
    staleTime: 100,
    placeholderData: () => {
      if (!page || !q) return undefined;
      if (q === "") return undefined;
      const searchData = queryClient
        .getQueryData(getBooksSearchQueryOptions(q, page).queryKey)
        ?.docs.find((dock) => dock.key.includes(key));
      if (!searchData) return undefined;
      return {
        title: searchData.title,
        covers: searchData.cover_i ? [searchData.cover_i] : undefined,
        key: searchData?.key,
        type: { key: "/type/work" },
      };
    },
  });
}

export const useWorkSearch = (q: string, page: number = 1, key: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...getWorkQueryOptions(key, queryClient, q, page),
  });
};
