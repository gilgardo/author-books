import { useSearchParams } from "react-router-dom";

import { maxResults } from "@/data/maxResults.ts";
import { useNavigateToParams } from "@/customHooks/useNavigateToParams";
import CardLoader from "./CardLoader";
import SearchCard from "./SearchCard";
import { useDocsSearch } from "./useDocsSearch";
import PageNavigation from "@/components/PageNavigation";
import { useQueryClient } from "@tanstack/react-query";
import books from "../bookKeys";
import { getWorkQueryOptions } from "../Dettails/useWorkSearch";
import { getEditionQueryOptions } from "../Dettails/useEditionSearch";
import { useState } from "react";
import AddTolibraryDialog from "./AddTolibraryDialog";

const BooksSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const navigateToBookDetails = useNavigateToParams("/book");
  const { data, isPending, isPlaceholderData } = useDocsSearch(query, page);
  const maxPage = Math.min(Math.ceil((data?.numFound ?? 0) / maxResults), 100);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [clickedKey, setClickedKey] = useState("");
  const clikedBook =
    data?.docs.find((doc) => doc.key === clickedKey) ?? data?.docs[0];

  const handleClick = (workKey: string, editionKey: string) =>
    navigateToBookDetails({
      q: query,
      page: page.toString(),
      workKey,
      editionKey,
    });

  const handlePrefetch = (workKey: string, editionKey: string) => {
    const doc = data?.docs.find((doc) => doc.key.includes(workKey));
    if (!doc) return;
    queryClient.setQueryData(books.doc(query, page, workKey).queryKey, doc);
    queryClient.prefetchQuery(getWorkQueryOptions(workKey));
    if (editionKey !== "")
      queryClient.prefetchQuery(getEditionQueryOptions(editionKey));
  };

  return (
    <>
      <h2 className="text-dark text-xl md:text-2xl mb-3">
        Search results for{" "}
        <span className="font-bold text-primary">{query}</span>:
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-fr">
        {isPending
          ? Array.from({ length: maxResults }).map((__, i) => (
              <CardLoader key={i} />
            ))
          : data?.docs.map((doc) => (
              <SearchCard
                key={doc.key}
                doc={doc}
                handleClick={handleClick}
                handlePrefetch={handlePrefetch}
                isPlaceholderData={isPlaceholderData}
                setOpen={setOpen}
                setClickedKey={setClickedKey}
              />
            ))}
      </div>
      {data && (
        <>
          {clikedBook && (
            <AddTolibraryDialog
              open={open}
              setOpen={setOpen}
              book={clikedBook}
            />
          )}
          <PageNavigation
            page={page}
            maxPage={maxPage}
            searchParams={searchParams}
          />
        </>
      )}
    </>
  );
};

export default BooksSearch;
