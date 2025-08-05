import defaultFn from "@/utils/defaultFn";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { type Book, type Library } from "@prisma/client";

export type LibraryWithBooks = Library & {
  books: Book[];
};

const userkey = createQueryKeys("user", {
  all: null,
  libraries: {
    queryKey: null,
    queryFn: defaultFn<LibraryWithBooks[]>,
    contextQueries: {
      id: (id: string) => ({
        queryKey: [id],
        queryFn: defaultFn<Book[]>,
      }),
    },
  },
});

export default userkey;
