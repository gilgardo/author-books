import { useParams, useSearchParams } from "react-router-dom";
import { useLibrarySearch } from "../librariesHook";
import SearchCard from "../../Book/Search/SearchCard";
import CardLoader from "../../Book/Search/CardLoader";
import { useNavigateToParams } from "@/frontend/customHooks/useNavigateToParams";
import { getWorkQueryOptions } from "../../Book/Dettails/useWorkSearch";
import { useQueryClient } from "@tanstack/react-query";
import { getEditionQueryOptions } from "../../Book/Dettails/useEditionSearch";

const Library = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);
  const libraryName = searchParams.get("lib");
  const navigateToBookDetails = useNavigateToParams("/book");
  const {
    data: booksResults,
    isPending,
    isPlaceholderData,
  } = useLibrarySearch(id, page);

  const queryClient = useQueryClient();
  const handleClick = (workKey: string, editionKey: string) =>
    navigateToBookDetails({
      page: page.toString(),
      workKey,
      editionKey,
    });

  const handlePrefetch = (workKey: string, editionKey: string) => {
    const doc = booksResults?.data.find((doc) => doc.key.includes(workKey));
    if (!doc) return;
    queryClient.prefetchQuery(getWorkQueryOptions(workKey));
    if (editionKey !== "")
      queryClient.prefetchQuery(getEditionQueryOptions(editionKey));
  };

  console.log("isPlaceholderData:", isPlaceholderData);
  console.log("booksResults:", booksResults);
  return (
    <div className="w-full mt-5 self-start">
      {isPending ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[1fr]">
          {Array.from({ length: 12 }).map((_, i) => (
            <CardLoader key={i + "book-load"} />
          ))}
        </div>
      ) : booksResults?.data.length === 0 ? (
        <div>
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
          <p className="text-sm text-gray-500">
            Try searching by title or author to add some.
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-3">
            Books of the library
            {libraryName && (
              <span className=" font-bold text-primary">
                {"  " + libraryName}
              </span>
            )}{" "}
            :
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[1fr] w-full">
            {booksResults?.data.map((doc) => (
              <SearchCard
                key={doc.key}
                doc={doc}
                handleClick={handleClick}
                handlePrefetch={handlePrefetch}
                isPlaceholderData={isPlaceholderData}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Library;
