import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
// import { useDebounce } from "@uidotdev/usehooks";
import { toggle } from "../../utils/toggleBolean";
import { useNavigate } from "react-router-dom";

const NavSearch = () => {
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");
  // const debouncedSearch = useDebounce(search, 300);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <div className="relative h-8 flex items-center z-10">
      <div
        className={`flex items-center bg-light rounded-full h-8 transition-all duration-300 overflow-hidden ${
          isActive ? "w-55" : "w-8"
        }`}
        tabIndex={-1}>
        {isActive && (
          <div className="relative">
            <MagnifyingGlassIcon
              onClick={() => {
                if (search !== "") {
                  navigate(`/books/search?q=${encodeURIComponent(search)}`);
                  setSearch("");
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-dark cursor-pointer"
            />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => {
                toggle(setIsActive)();
                setSearch("");
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
    </div>
  );
};

export default NavSearch;
