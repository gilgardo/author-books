export type bookT = {
  id: string;
  title: string;
  year: number;
};
export type authorT = {
  id: string;
  name: string;
  bio: string;
  books: bookT[];
};
