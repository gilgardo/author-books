import { queryOptions, useQuery } from "@tanstack/react-query";
import books from "../bookKeys";

export function getEpubQueryOptions(ocaid: string) {
  return {
    ...queryOptions({
      ...books.epub(ocaid),
      enabled: !!ocaid,
    }),
  };
}

export const useEpubGet = (ocaid: string) =>
  useQuery(getEpubQueryOptions(ocaid));
