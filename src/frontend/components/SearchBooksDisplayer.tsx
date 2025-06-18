import type { UseQueryResult } from "@tanstack/react-query";
import type { Volume } from "../../types/googleApi";
import BooksSearchLoader from "../loaders/BooksSearchLoader";

const SearchBooksDisplayer = ({
  queryResult,
}: {
  queryResult: UseQueryResult<Volume[]>;
}) => {
  const { data: books, isError, isPending, isPlaceholderData } = queryResult;

  if (isError)
    return (
      <div className="text-red-500">
        An error occurred while fetching books.
      </div>
    );

  if (isPending) return <BooksSearchLoader />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
      {books.map((book) => (
        <div
          key={book.id}
          className={`${
            isPlaceholderData ? "bg-green/40" : "bg-green/80"
          } shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-105 hover:shadow-xl duration-200 flex flex-col justify-between p-4 min-h-[320px]`}>
          <div className="flex flex-col items-center text-center">
            <img
              className="h-48 w-40 object-cover rounded-md mb-3"
              src={book.volumeInfo.imageLinks?.thumbnail || ""}
              alt={book.volumeInfo.title}
            />
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {book.volumeInfo.title}
            </h2>
          </div>
          {book.volumeInfo.authors && (
            <p className="text-sm text-light mt-4 text-center line-clamp-1">
              {book.volumeInfo.authors.join(", ")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchBooksDisplayer;
