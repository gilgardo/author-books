import { useSearchParams } from "react-router-dom";
import SearchBooksDisplayer from "../components/SearchBooksDisplayer";
import CustomButton from "../components/CustomButton.tsx";
import { useBooksSearch } from "../useQueryCustomHooks/useBooksSearch.ts";
import { useNavigateToParams } from "../customHooks/useNavigateToParams.ts";

const BooksSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 0);
  const navigateToBookDetails = useNavigateToParams("/book");
  const maxPages = 5;

  const queryResult = useBooksSearch(query, page);

  const handleClick = (id: string) =>
    navigateToBookDetails({ id, q: query, page: page.toString() });

  return (
    <>
      <h2 className="text-dark text-xl md:text-2xl">
        Search results for <span className="font-bold text-green">{query}</span>
        :
      </h2>
      <SearchBooksDisplayer
        queryResult={queryResult}
        handleClick={handleClick}
      />
      <div
        className="flex justify-end
       items-center mt-4 gap-6">
        <CustomButton
          disabled={page === 0 || queryResult.isPlaceholderData}
          onClick={() =>
            setSearchParams((params) => {
              params.set("page", (page - 1).toString());
              return params;
            })
          }>
          PREV
        </CustomButton>
        <CustomButton
          disabled={page === maxPages || queryResult.isPlaceholderData}
          onClick={() =>
            setSearchParams((params) => {
              params.set("page", (page + 1).toString());
              return params;
            })
          }>
          NEXT
        </CustomButton>
      </div>
    </>
  );
};

export default BooksSearch;
