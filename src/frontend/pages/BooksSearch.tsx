import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBooksDisplayer from "../components/SearchBooksDisplayer";
import CustomButton from "../components/CustomButton.tsx";
import { useBooksSearch } from "../useQueryCustomHooks/useBooksSearch.tsx";

const BooksSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const maxPages = 5;

  useEffect(() => {
    setPage(0);
  }, [query]);

  const queryResult = useBooksSearch(query, page);

  const handleClick = (id: string) =>
    navigate(
      `/book?id=${encodeURIComponent(id)}&q=${encodeURIComponent(
        query
      )}&page=${encodeURIComponent(page)}`
    );

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
        <CustomButton disabled={page === 0} onClick={() => setPage(page - 1)}>
          PREV
        </CustomButton>
        <CustomButton
          disabled={page === maxPages}
          onClick={() => setPage(page + 1)}>
          NEXT
        </CustomButton>
      </div>
    </>
  );
};

export default BooksSearch;
