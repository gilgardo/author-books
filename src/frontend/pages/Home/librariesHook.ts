import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import userkey from "./userKey";
import api from "@/utils/api";
import toast from "react-hot-toast";

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

  useMutation({
    mutationFn: ({ name }: { name: string }) =>
      api.post("/libraries", { name }),

    onMutate: async ({ name, userId }: { name: string; userId: number }) => {
      const libQueryKey = getLibrariesQueryOptions().queryKey;
      await queryClient.cancelQueries(getLibrariesQueryOptions());
      const prevLibraries = queryClient.getQueryData(libQueryKey);

      const optimisticId = Number(uuidv4());
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
