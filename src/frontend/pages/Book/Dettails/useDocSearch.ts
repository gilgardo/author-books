import {
  QueryClient,
  queryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getDocsSearchQueryOptions } from "../Search/useDocsSearch";
import books from "../bookKeys";

export function getDocQueryOptions(
  key: string,
  queryClient: QueryClient,
  q: string,
  page: number
) {
  return {
    ...queryOptions({
      ...books.doc(q, page, key),
      enabled: !!q,
      initialData: () => {
        if (q === "") return undefined;
        return queryClient
          .getQueryData(getDocsSearchQueryOptions(q, page).queryKey)
          ?.docs.find((doc) => doc.key.includes(key));
      },
    }),
  };
}

export const useDocSearch = (q: string, page: number, key: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...getDocQueryOptions(key, queryClient, q, page),
  });
};
