import { queryOptions, useQuery } from "@tanstack/react-query";

import books from "../bookKeys";

export function getWorkQueryOptions(key: string) {
  return queryOptions({
    ...books.work(key),
    staleTime: 3000,
  });
}

export const useWorkSearch = (key: string) => {
  return useQuery({
    ...getWorkQueryOptions(key),
  });
};
