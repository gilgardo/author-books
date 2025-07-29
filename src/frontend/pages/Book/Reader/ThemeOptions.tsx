import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { FC } from "react";
import { HiColorSwatch } from "react-icons/hi";

export type ThemeModes = "light" | "dark";

interface Props {
  onThemeSelect?(mode: ThemeModes): void;
}

const ThemeOptions: FC<Props> = ({ onThemeSelect }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <HiColorSwatch size={30} />
      </PopoverTrigger>

      <PopoverContent className="dark:bg-book-dark dark:text-book-dark">
        <div className="flex items-center justify-center space-x-3 p-3">
          <button onClick={() => onThemeSelect && onThemeSelect("light")}>
            Light
          </button>
          <button onClick={() => onThemeSelect && onThemeSelect("dark")}>
            Dark
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeOptions;
