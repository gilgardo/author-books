export type BooksSearchParams = {
  q: string;
  page?: string;
};

export type BookDetailsParams = {
  workKey: string;
  editionKey: string;
  q?: string;
  page?: string;
};
