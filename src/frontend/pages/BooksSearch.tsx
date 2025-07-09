import { useSearchParams } from "react-router-dom";
import { useBooksSearch } from "../useQueryCustomHooks/useBooksSearch.ts";
import { useNavigateToParams } from "../customHooks/useNavigateToParams.ts";
import BooksSearchLoader from "../loaders/BooksSearchLoader.tsx";
import BookSearchCard from "../components/BookSearchCard.tsx";
import PageNavigation from "../components/PageNavigation.tsx";

const BooksSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const navigateToBookDetails = useNavigateToParams("/book");

  const { data, isPending, isPlaceholderData } = useBooksSearch(query, page);

  const handleClick = (key: string) =>
    navigateToBookDetails({ q: query, page: page.toString(), key });

  return (
    <>
      <h2 className="text-dark text-xl md:text-2xl">
        Search results for <span className="font-bold text-green">{query}</span>
        :
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {isPending ? (
          <BooksSearchLoader />
        ) : (
          data?.docs.map((doc) => (
            <BookSearchCard
              doc={doc}
              handleClick={handleClick}
              isPlaceholderData={isPlaceholderData}
            />
          ))
        )}
      </div>
      <PageNavigation page={page} setSearchParams={setSearchParams} />
    </>
  );
};

export default BooksSearch;
