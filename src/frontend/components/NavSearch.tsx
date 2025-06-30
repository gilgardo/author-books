import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDebounce } from "@uidotdev/usehooks";
import { toggle } from "../../utils/toggleBolean";
import { useBooksSearch } from "../useQueryCustomHooks/useBooksSearch";
import type { BookDetailsParams, BooksSearchParams } from "../../types/params";
import { useNavigateToParams } from "../customHooks/useNavigateToParams";

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

  const { data: books } = useBooksSearch(debouncedSearch, 0);
  const suggestionListData = books?.slice(0, 5);
  const isSuggestionListOpen =
    isActive && books && books.length > 0 && debouncedSearch.length > 3;

  useEffect(() => {
    if (!isActive || !isSuggestionListOpen) {
      return;
    }
    if (focusIndex === 0) {
      inputRef.current?.focus();
      return;
    }
    const nextSuggestion = suggestionsListRef.current?.children.item(
      focusIndex - 1
    ) as HTMLElement;
    nextSuggestion.focus();
  }, [isActive, focusIndex, isSuggestionListOpen]);

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
    const events = ["Enter", "Tab", "ArrowDown", "ArrowUp"];

    if (!events.includes(e.key)) return;

    if (e.key === "Enter") {
      enterFn();
    }
    if (!shouldExecute) return;
    e.preventDefault();

    const incrementFocus = (inc: number) => {
      setFocusIndex((prevIndex) => {
        if (prevIndex === maxLength) return 0;
        if (prevIndex + inc === 0) return maxLength;
        return prevIndex + inc;
      });
    };
    if (e.key === "Tab") {
      incrementFocus(1);
    }
    if (e.key === "ArrowDown") {
      incrementFocus(1);
    }
    if (e.key === "ArrowUp") {
      incrementFocus(-1);
    }
  };

  return (
    <div className="relative h-auto z-50">
      <div
        className={`flex items-center bg-light rounded-full h-8 transition-all duration-300 ${
          isActive ? "w-55" : "w-8"
        }`}
        tabIndex={-1}>
        {isActive && (
          <div className="relative w-full">
            <MagnifyingGlassIcon
              tabIndex={0}
              onClick={() => navigateToBookSearch({ q: search })}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-dark cursor-pointer z-10 focus:outline-none"
              ref={searchRef}
            />

            <input
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
              className="bg-transparent pl-3 pr-7 py-1 text-sm outline-none focus:ring-2 focus:ring-black rounded-full w-full animate-fadeIn"
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
          {suggestionListData?.map((book, index) => (
            <li
              key={book.id}
              className="py-1 px-2 cursor-pointer rounded-md outline-none focus:bg-green/40 flex items-start gap-3"
              tabIndex={0}
              onClick={() =>
                navigateToBookDetails({
                  id: book.id,
                  q: search,
                })
              }
              onKeyDown={(e) =>
                handleSuggestionListKeyDown(
                  e,
                  suggestionListData?.length ?? 0 + 1,
                  () =>
                    navigateToBookDetails({
                      id: book.id,
                      q: search,
                    }),
                  isSuggestionListOpen
                )
              }
              onMouseEnter={() => setFocusIndex(index + 1)}>
              <img
                src={book.volumeInfo.imageLinks?.smallThumbnail || ""}
                alt={book.volumeInfo.title}
                className="h-10 w-6 rounded-md object-cover shrink-0"
              />
              <span className="line-clamp-2 text-sm font-bold text-dark max-w-[12rem]">
                {book.volumeInfo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavSearch;
