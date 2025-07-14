import { queryOptions, useQuery } from "@tanstack/react-query";
import books from "../bookKeys";

export function getEdictionQueryOptions(key: string) {
  return {
    ...queryOptions({
      ...books.ediction(key),
      enabled: !!key,
    }),
  };
}

export const useEdictionSearch = (key: string) => {
  return useQuery({
    ...getEdictionQueryOptions(key),
  });
};
