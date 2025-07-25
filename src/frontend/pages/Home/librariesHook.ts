import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
// import { v4 as uuidv4 } from "uuid";
import userkey from "./userKey";
import api from "@/utils/api";
import toast from "react-hot-toast";
import type { Library } from "@prisma/client";
import type { AxiosResponse } from "axios";

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

export const useMutateLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name }: { name: string }) =>
      api
        .post("/user/libraries", { name })
        .then((res: AxiosResponse<Library>) => res.data),

    onMutate: async ({ name, userId }: { name: string; userId: number }) => {
      const libQueryKey = getLibrariesQueryOptions().queryKey;
      await queryClient.cancelQueries(getLibrariesQueryOptions());
      const prevLibraries = queryClient.getQueryData(libQueryKey);

      const optimisticId = -Date.now();
      const optimisticLib = { name, userId, id: optimisticId };
      queryClient.setQueryData(libQueryKey, (old) =>
        old ? [...old, optimisticLib] : [optimisticLib]
      );

      return { prevLibraries, optimisticId };
    },

    onError: (err, _, context) => {
      toast.error(err.message);
      queryClient.setQueryData(
        getLibrariesQueryOptions().queryKey,
        context?.prevLibraries
      );
    },

    onSuccess: (result, _, context) => {
      toast.success("library added succesfuly");
      queryClient.setQueryData(getLibrariesQueryOptions().queryKey, (old) =>
        old?.map((lib) => (lib.id === context?.optimisticId ? result : lib))
      );
    },

    onSettled: () => queryClient.invalidateQueries(getLibrariesQueryOptions()),
  });
};
