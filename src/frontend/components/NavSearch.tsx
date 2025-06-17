import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const NavSearch = () => {
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggle = () => setIsActive((prev) => !prev);
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <div className="relative h-8 flex items-center">
      <div
        className={`flex items-center bg-light rounded-full h-8 transition-all duration-300 overflow-hidden ${
          isActive ? "w-55" : "w-8"
        }`}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            toggle();
          }
        }}
        tabIndex={-1}>
        {isActive && (
          <div className="relative">
            <MagnifyingGlassIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-dark" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-transparent pl-3 pr-7 py-1 text-sm outline-none w-full animate-fadeIn"
            />
          </div>
        )}
        {!isActive && (
          <button
            onClick={toggle}
            onMouseEnter={toggle}
            className="h-8 w-8 flex items-center justify-center hover:opacity-80 focus:outline-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-dark animate-fadeIn" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavSearch;
