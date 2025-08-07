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
import { maxResults } from "@/data/maxResults";
import type { Book } from "@prisma/client";
import type { OpenLibrarySearchDoc } from "@/types/openLibrary";

export function getLibrariesQueryOptions() {
  return queryOptions({
    ...userkey.libraries,
  });
}

export function getLibraryQueryOptions(id: string | undefined, page: number) {
  return queryOptions({
    ...userkey.libraries._ctx.id(id ? id : "", page),
    enabled: !!id,
  });
}

export const useLibrariesSearch = () => {
  return useQuery({
    ...getLibrariesQueryOptions(),
  });
};

export const useLibrarySearch = (id: string | undefined, page: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...getLibraryQueryOptions(id, page),
    placeholderData: () => {
      if (!id) return undefined;

      const startIndex = page * maxResults;
      const endIndex = startIndex + maxResults;

      const libraries = queryClient.getQueryData(
        getLibrariesQueryOptions().queryKey
      );
      const books =
        libraries?.find((lib) => lib.id.toString() === id)?.books ?? [];

      const data = books.slice(startIndex, endIndex);
      const totalItems = books.length;
      const totalPages = Math.ceil(totalItems / maxResults);

      return { data, page, totalPages, totalItems };
    },
  });
};

export const useMutateLibraries = () => {
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

export const useMutateLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ book, id }: { book: OpenLibrarySearchDoc; id: string }) =>
      api
        .post(`user/libraries/id/${id}`, { book })
        .then((res: AxiosResponse<Book>) => res.data),

    onMutate: async ({
      book,
      id,
    }: {
      book: OpenLibrarySearchDoc;
      id: string;
    }) => {
      const libQueryKey = getLibrariesQueryOptions().queryKey;
      await queryClient.cancelQueries(getLibrariesQueryOptions());
      const books = queryClient
        .getQueryData(libQueryKey)
        ?.find((lib) => lib.id.toString() === id)?.books;

      if (!books) return;
      const optimisticId = -Date.now();
      const optimisticBooks = [...books, { ...book, libraryId: optimisticId }];
      const page = Math.ceil(optimisticBooks.length / maxResults);
      const booksQueryKey = getLibraryQueryOptions(id, page).queryKey;

      const startIndex = page * maxResults;
      const endIndex = startIndex + maxResults;

      const data = optimisticBooks.slice(startIndex, endIndex);
      const totalItems = books.length;
      const totalPages = Math.ceil(totalItems / maxResults);

      const prevData = queryClient.getQueryData(booksQueryKey);

      queryClient.setQueryData(userkey.libraries._ctx.id(id, page).queryKey, {
        data,
        page,
        totalItems,
        totalPages,
      });

      return { prevData, id, page, optimisticId };
    },

    onError: (error, _, context) => {
      const err = error as AxiosError<{ message?: string; type?: string }>;
      const message = err.response?.data?.message ?? err.message;
      toast.error(message);

      if (!context) return;
      const { prevData, id, page } = context;

      queryClient.setQueryData(
        getLibraryQueryOptions(id, page).queryKey,
        prevData
      );
    },

    onSuccess: (result, _, context) => {
      toast.success("book added succesfuly");

      if (!context) return;
      const { id, page, optimisticId } = context;
      queryClient.setQueryData(
        getLibraryQueryOptions(id, page).queryKey,
        (old) =>
          old && {
            ...old,
            data: old.data.map((book) =>
              book.libraryId === optimisticId ? result : book
            ),
          }
      );
    },

    onSettled: () => queryClient.invalidateQueries(getLibrariesQueryOptions()),
  });
};
