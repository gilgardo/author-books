import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../data";
import { useState } from "react";
import type { Volume } from "../../types/googleApi";
import SearchBooksDisplayer from "../components/SearchBooksDisplayer";
import { maxResults } from "../../data/maxResults.ts";

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

  const queryResult = useQuery({
    queryKey: ["books/search", query, page],
    queryFn: () => searchBooks(query, page),
    enabled: query !== "",
  });

  return (
    <div className="md:ml-100 px-10 py-8">
      <h2 className="text-dark text-xl md:text-2xl">
        Search results for <span className="font-bold text-green">{query}</span>
        :
      </h2>
      <SearchBooksDisplayer queryResult={queryResult} />
    </div>
  );
};

export default BooksSearch;
