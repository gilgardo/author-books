import { queryOptions, useQuery } from "@tanstack/react-query";

import userkey from "./userKey";

export function getLibrariesQueryOptions() {
  return queryOptions({
    ...userkey.libraries,
  });
}

export const useLibrariesSearch = () => {
  return useQuery({
    ...getLibrariesQueryOptions(),
  });
};
