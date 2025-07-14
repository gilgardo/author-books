import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import books from "../bookKeys";

export function getDocsSearchQueryOptions(q: string, page: number) {
  return queryOptions({
    ...books.docs(q, page + 1),
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
