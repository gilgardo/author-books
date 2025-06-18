import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDebounce } from "@uidotdev/usehooks";
import { toggle } from "../../utils/toggleBolean";
import { useNavigate } from "react-router-dom";
import { useBooksSearch } from "../useQueryCustomHooks/useBooksSearch";

const NavSearch = () => {
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { data: books } = useBooksSearch(debouncedSearch, 0);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  console.log(books);
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
              onClick={() => {
                if (search !== "") {
                  navigate(`/books/search?q=${encodeURIComponent(search)}`);
                  setSearch("");
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-dark cursor-pointer z-10"
            />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => {
                setTimeout(() => {
                  toggle(setIsActive)();
                  setSearch("");
                }, 300);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search !== "") {
                  navigate(`/books/search?q=${encodeURIComponent(search)}`);
                  setSearch("");
                }
              }}
              placeholder="Search..."
              className="bg-transparent pl-3 pr-7 py-1 text-sm outline-none w-full animate-fadeIn"
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

      {isActive && books && books.length > 0 && debouncedSearch.length > 3 && (
        <ul className="absolute top-10 left-0 w-65 bg-white rounded-md shadow-lg z-50 max-h-60 overflow-y-auto p-2">
          {books.slice(0, 5).map((book) => (
            <li
              key={book.id}
              className="py-1 px-2 rounded-md hover:bg-green/40 cursor-pointer flex justify-start items-center gap-3"
              onClick={() => {
                navigate(`/books/${book.id}`);
                setSearch("");
                toggle(setIsActive)();
              }}>
              <img
                src={book.volumeInfo.imageLinks?.smallThumbnail || ""}
                alt={book.volumeInfo.title}
                className="h-full w-6 rounded-md"
              />
              <span className="text-sm text-dark font-bold">
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
