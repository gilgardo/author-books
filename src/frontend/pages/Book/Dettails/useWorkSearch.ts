import {
  QueryClient,
  queryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getDocsSearchQueryOptions } from "../Search/useDocsSearch";
import books from "../bookKeys";

export function getWorkQueryOptions(
  key: string,
  queryClient: QueryClient,
  q?: string,
  page?: number
) {
  return queryOptions({
    ...books.work(key),
    staleTime: 3000,
    placeholderData: () => {
      if (!page || !q) return undefined;
      if (q === "") return undefined;
      const searchData = queryClient
        .getQueryData(getDocsSearchQueryOptions(q, page).queryKey)
        ?.docs.find((doc) => doc.key.includes(key));
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
