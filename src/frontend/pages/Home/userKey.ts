import defaultFn from "@/utils/defaultFn";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { type Book, type Library } from "@prisma/client";

export type LibraryWithBooks = Library & {
  books: Book[];
};

export type BooksResponse = {
  data: Book[];
  page: number;
  totalPages: number;
  totalItems: number;
};

const userkey = createQueryKeys("user", {
  all: null,
  libraries: {
    queryKey: null,
    queryFn: defaultFn<LibraryWithBooks[]>,
    contextQueries: {
      id: (id: string, page: number) => ({
        queryKey: [id, { page }],
        queryFn: defaultFn<BooksResponse>,
      }),
    },
  },
});

export default userkey;
// {
//     data: books,
//     page,
//     totalPages: Math.ceil(total / limit),
//     totalItems: total,
//   }
