import { defaultFn } from "@/frontend/main";
import type {
  OpenLibraryEdition,
  OpenLibrarySearchDoc,
  OpenLibraryWork,
  OpenLibrarySearchResponse,
} from "@/types/openLibrary";
import { createQueryKeys } from "@lukemorales/query-key-factory";

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
  edition: (key: string) => ({
    queryKey: [key],
    queryFn: defaultFn<OpenLibraryEdition>,
  }),
  work: (key: string) => ({
    queryKey: [key],
    queryFn: defaultFn<OpenLibraryWork>,
  }),
});

export default books;
