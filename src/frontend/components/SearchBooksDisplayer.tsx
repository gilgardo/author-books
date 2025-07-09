import type { UseQueryResult } from "@tanstack/react-query";
import BooksSearchLoader from "../loaders/BooksSearchLoader";
import clsx from "clsx";
import type { OpenLibrarySearchResponse } from "@/types/openLibrary";
import coverUrlFactory from "@/utils/coverUrlFactory";

const SearchBooksDisplayer = ({
  queryResult,
  handleClick,
}: {
  queryResult: UseQueryResult<OpenLibrarySearchResponse>;
  handleClick: (id: string) => void;
}) => {
  const { data, isPending, isPlaceholderData } = queryResult;

  if (isPending) return <BooksSearchLoader />;
  console.log(data);
  return (
    data && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {data.docs.map((doc) => (
          <div
            key={doc.key}
            onClick={() => handleClick(doc.key)}
            className={clsx(
              isPlaceholderData ? "bg-green/40" : "bg-green/80 hover:bg-green",
              "shadow-md rounded-2xl overflow-hidden transition-transform hover:shadow-2xl hover:scale-95 duration-200 flex flex-col justify-between p-4 cursor-pointer"
            )}>
            <div className="flex flex-col items-center text-center">
              <img
                className="h-60 w-40 object-cover rounded-md mb-3"
                src={
                  doc.cover_i
                    ? coverUrlFactory(doc.cover_i).M
                    : "/default_book_cover.jpg"
                }
                alt={doc.title}
              />
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {doc.title}
              </h2>
            </div>
            {doc.author_name && (
              <p className="text-sm text-light mt-4 text-center line-clamp-1">
                {doc.author_name.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  );
};

export default SearchBooksDisplayer;
