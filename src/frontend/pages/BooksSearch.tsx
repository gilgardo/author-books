import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../data";
import { useEffect, useState } from "react";
import type { Volume } from "../../types/googleApi";
import SearchBooksDisplayer from "../components/SearchBooksDisplayer";
import { maxResults } from "../../data/maxResults.ts";
import CustomButton from "../components/CustomButton.tsx";

const searchBooks = async (query: string, page: number) => {
  const res = await fetch(
    `${BASE_URL}/books/search?q=${encodeURIComponent(query)}&startIndex=${
      page * maxResults
    }`
  );
  if (!res.ok) throw new Error("bad request");
  const data = await res.json();
  return data as Volume[];
};

const BooksSearch = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const query = searchParams.get("q") || "";
  const maxPages = 5;

  useEffect(() => {
    setPage(0);
  }, [query]);

  const queryResult = useQuery({
    queryKey: ["books/search", query, page],
    queryFn: () => searchBooks(query, page),
    enabled: query !== "",
    staleTime: 10 * 1000,
    placeholderData: (previousData) => previousData,
  });

  return (
    <div className="md:ml-100 px-10 py-8 flex flex-col justify-end">
      <h2 className="text-dark text-xl md:text-2xl">
        Search results for <span className="font-bold text-green">{query}</span>
        :
      </h2>
      <SearchBooksDisplayer queryResult={queryResult} />
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
    </div>
  );
};

export default BooksSearch;
