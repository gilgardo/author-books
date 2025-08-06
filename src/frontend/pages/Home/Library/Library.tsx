import { useParams, useSearchParams } from "react-router-dom";
import { useLibrarySearch } from "../librariesHook";
import SearchCard from "../../Book/Search/SearchCard";
import CardLoader from "../../Book/Search/CardLoader";

const Library = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);
  const libraryName = searchParams.get("lib");
  const {
    data: booksResults,
    isPending,
    isPlaceholderData,
  } = useLibrarySearch(id, page);

  const handleClick = () => {};
  const handlePrefetch = () => {};

  console.log(booksResults?.data);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-fr">
      {isPending ? (
        Array.from({ length: 12 }).map((__, i) => (
          <CardLoader key={i + "book load"} />
        ))
      ) : booksResults?.data.length === 0 ? (
        <div className="col-span-full mt-4">
          <h3 className="text-lg font-semibold text-gray-600">
            No books found in
            {libraryName ? (
              <span className="text-primary font-bold">
                {"  " + libraryName}
              </span>
            ) : (
              "this library"
            )}
            .
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Try searching by title or author to add some.
          </p>
        </div>
      ) : (
        booksResults?.data?.map((doc) => (
          <SearchCard
            key={doc.key}
            doc={doc}
            handleClick={handleClick}
            handlePrefetch={handlePrefetch}
            isPlaceholderData={isPlaceholderData}
          />
        ))
      )}
    </div>
  );
};

export default Library;
