import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDebounce } from "@uidotdev/usehooks";
import { toggle } from "../../utils/toggleBolean";
import { useDocsSearch } from "../pages/Book/Search/useDocsSearch";
import type { BookDetailsParams, BooksSearchParams } from "../../types/params";
import { useNavigateToParams } from "../customHooks/useNavigateToParams";
import clsx from "clsx";
import coverUrlFactory from "@/utils/coverUrlFactory";
import { Input } from "@/components/ui/input";

const NavSearch = ({ reset }: { reset?: () => void }) => {
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");
  const [focusIndex, setFocusIndex] = useState(0);
  const debouncedSearch = useDebounce(search, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef(null);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  const navigateToBookSearch: (params: BooksSearchParams) => void =
    useNavigateToParams("/books/search", {
      shouldNavigate: search !== "",
      onAfterNavigate: () => {
        setSearch("");
        reset?.();
      },
    });
  const navigateToBookDetails: (params: BookDetailsParams) => void =
    useNavigateToParams("/book", {
      onAfterNavigate: () => {
        setSearch("");
        reset?.();
      },
    });

  const { data } = useDocsSearch(debouncedSearch, 1);
  const suggestionListData = data?.docs?.slice(0, 5);
  const isSuggestionListOpen =
    isActive &&
    data?.docs &&
    data?.docs.length > 0 &&
    debouncedSearch.length > 3;

  useEffect(() => {
    if (!isSuggestionListOpen) return;

    if (focusIndex === 0) {
      inputRef.current?.focus();
      return;
    }
    const nextSuggestion = suggestionsListRef.current?.children.item(
      focusIndex - 1
    ) as HTMLElement;
    nextSuggestion.focus();
  }, [focusIndex, isSuggestionListOpen]);

  useEffect(() => {
    if (!isActive) return;

    inputRef.current?.focus();
  }, [isActive]);

  const handleBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget;
    if (
      relatedTarget !== inputRef.current &&
      relatedTarget !== searchRef.current &&
      !suggestionsListRef.current?.contains(relatedTarget)
    ) {
      toggle(setIsActive)();
      setSearch("");
    }
  };

  const handleSuggestionListKeyDown = (
    e: React.KeyboardEvent,
    maxLength: number,
    enterFn: () => void,
    shouldExecute: boolean | undefined
  ) => {
    const incrementFocus = (inc: number) => {
      setFocusIndex((prevIndex) => {
        if (prevIndex + inc === maxLength + 1) return 0;
        if (prevIndex + inc === -1) return maxLength;
        return prevIndex + inc;
      });
    };
    switch (e.key) {
      case "Enter":
        if (!shouldExecute) break;
        e.preventDefault();
        enterFn();
        break;

      case "Tab":
      case "ArrowDown":
        e.preventDefault();
        incrementFocus(1);
        break;

      case "ArrowUp":
        e.preventDefault();
        incrementFocus(-1);
        break;
      default:
        return;
    }
  };
  return (
    <div className="relative h-auto z-50">
      <div
        className={clsx(
          "flex items-center bg-secondary rounded-full h-8 transition-all duration-300",
          isActive ? "w-40 md:w-55" : "w-8"
        )}
        tabIndex={-1}>
        {isActive && (
          <div className="relative w-full">
            <MagnifyingGlassIcon
              tabIndex={0}
              onClick={() => navigateToBookSearch({ q: search })}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer z-10 focus:outline-none"
              ref={searchRef}
            />

            <Input
              ref={inputRef}
              type="text"
              value={search}
              onMouseEnter={() => setFocusIndex(0)}
              onBlur={handleBlur}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) =>
                handleSuggestionListKeyDown(
                  e,
                  suggestionListData?.length ?? 0 + 1,
                  () => navigateToBookSearch({ q: search }),
                  isSuggestionListOpen
                )
              }
              placeholder="Search..."
              className=" pl-3 pr-7 py-1 text-sm rounded-full w-full animate-fadeIn ocus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]"
            />
          </div>
        )}

        {!isActive && (
          <button
            onClick={toggle(setIsActive)}
            onMouseEnter={toggle(setIsActive)}
            className="h-8 w-8 flex items-center justify-center hover:opacity-80 focus:outline-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-dark animate-fadeIn" />
          </button>
        )}
      </div>
      {isSuggestionListOpen && (
        <ul
          ref={suggestionsListRef}
          onBlur={handleBlur}
          className="absolute top-10 left-0 w-65 bg-white rounded-md shadow-lg z-50 max-h-60 overflow-y-auto p-2">
          {suggestionListData?.map((doc, index) => (
            <li
              key={doc.key}
              className="py-1 px-2 cursor-pointer rounded-md outline-none focus:bg-primary/40 flex items-start gap-3"
              tabIndex={0}
              onClick={() =>
                navigateToBookDetails({
                  workKey: doc.key.replace("/works/", ""),
                  editionKey: doc.cover_edition_key ?? "",
                  q: search,
                })
              }
              onKeyDown={(e) =>
                handleSuggestionListKeyDown(
                  e,
                  suggestionListData?.length ?? 0 + 1,
                  () =>
                    navigateToBookDetails({
                      workKey: doc.key.replace("/works/", ""),
                      editionKey: doc.cover_edition_key ?? "",
                      q: search,
                    }),
                  isSuggestionListOpen
                )
              }
              onMouseEnter={() => setFocusIndex(index + 1)}>
              <img
                src={coverUrlFactory(doc.cover_i, doc.ia?.[0]).S}
                alt={doc.title}
                className="h-10 w-6 rounded-md object-cover shrink-0"
              />
              <span className="line-clamp-2 text-sm font-bold text-dark max-w-[12rem]">
                {doc.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavSearch;
