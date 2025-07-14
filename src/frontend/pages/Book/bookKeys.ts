import type {
  OpenLibraryEdition,
  OpenLibrarySearchDoc,
  OpenLibraryWork,
  OpenLibrarySearchResponse,
} from "@/types/openLibrary";
import api from "@/utils/api";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const defaultFn = async <T = unknown>(ctx: QueryFunctionContext) => {
  const { queryKey, signal } = ctx;
  const possibleParams = queryKey[queryKey.length - 1] as Record<
    string,
    string | number
  >;
  const params = typeof possibleParams !== "object" ? {} : possibleParams;
  const pathSegments = queryKey.filter((el) => typeof el === "string");
  const url = pathSegments.join("/");
  try {
    const { data } = await api.get(url, { params, signal });
    return data as T;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message ?? err.message);
  }
};

const books = createQueryKeys("book", {
  all: null,
  docs: (q: string, page: number) => ({
    queryKey: [{ q, page }],
    queryFn: defaultFn<OpenLibrarySearchResponse>,
  }),
  doc: (q: string, page: number, key: string) => ({
    queryKey: [key, { q, page }],
    queryFn: defaultFn<OpenLibrarySearchDoc>,
  }),
  ediction: (key: string) => ({
    queryKey: [key],
    queryFn: defaultFn<OpenLibraryEdition>,
  }),
  work: (key: string) => ({
    queryKey: [key],
    queryFn: defaultFn<OpenLibraryWork>,
  }),
});

export default books;
