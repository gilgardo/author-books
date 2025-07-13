import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../../../utils/api";
import type { OpenLibraryEdition } from "../../../../types/openLibrary";
import bookKeys from "../bookKeys";

const searchEdiction = async (key: string) => {
  const { data } = await api.get<OpenLibraryEdition>(`/books/ediction`, {
    params: { key },
  });

  return data;
};

export function getEdictionQueryOptions(key: string) {
  return {
    ...queryOptions({
      queryKey: bookKeys.ediction(key),
      queryFn: () => searchEdiction(key),
      enabled: !!key,
    }),
  };
}

export const useEdictionSearch = (key: string) => {
  return useQuery({
    ...getEdictionQueryOptions(key),
  });
};
