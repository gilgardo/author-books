import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
// import { v4 as uuidv4 } from "uuid";
import userkey, { type LibraryWithBooks } from "./userKey";
import api from "@/utils/api";
import toast from "react-hot-toast";
import type { AxiosError, AxiosResponse } from "axios";
import { getPath } from "@/utils/getPath";

export function getLibrariesQueryOptions() {
  return queryOptions({
    ...userkey.libraries,
  });
}

export function getLibraryQueryOptions(id: string | undefined) {
  return queryOptions({
    ...userkey.libraries._ctx.id(id ? id : ""),
    enabled: !!id,
  });
}

export const useLibrariesSearch = () => {
  return useQuery({
    ...getLibrariesQueryOptions(),
  });
};

export const useLibrarySearch = (id: string | undefined) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...getLibraryQueryOptions(id),
    placeholderData: () => {
      if (!id) return undefined;
      return queryClient
        .getQueryData(getLibrariesQueryOptions().queryKey)
        ?.find((lib) => lib.id.toString() === id)?.books;
    },
  });
};

export const useMutateLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name }: { name: string }) =>
      api
        .post(getPath(userkey.libraries.queryKey), { name })
        .then((res: AxiosResponse<LibraryWithBooks>) => res.data),

    onMutate: async ({ name, userId }: { name: string; userId: number }) => {
      const libQueryKey = getLibrariesQueryOptions().queryKey;
      await queryClient.cancelQueries(getLibrariesQueryOptions());
      const prevLibraries = queryClient.getQueryData(libQueryKey);

      const optimisticId = -Date.now();
      const optimisticLib = { name, userId, id: optimisticId, books: [] };
      queryClient.setQueryData(libQueryKey, (old) =>
        old ? [...old, optimisticLib] : [optimisticLib]
      );

      return { prevLibraries, optimisticId };
    },

    onError: (error, _, context) => {
      const err = error as AxiosError<{ message?: string; type?: string }>;
      const message = err.response?.data?.message ?? err.message;
      toast.error(message);
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
