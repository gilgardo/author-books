import { queryOptions, useQuery } from "@tanstack/react-query";
import books from "../bookKeys";

export function getEditionQueryOptions(key: string) {
  return {
    ...queryOptions({
      ...books.edition(key),
      enabled: !!key,
    }),
  };
}

export const useEdictionSearch = (key: string) => {
  return useQuery({
    ...getEditionQueryOptions(key),
  });
};
