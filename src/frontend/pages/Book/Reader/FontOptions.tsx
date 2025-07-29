import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { FC } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RiFontSize } from "react-icons/ri";

interface Props {
  onFontDecrease?(): void;
  onFontIncrease?(): void;
}

const FontOptions: FC<Props> = ({ onFontDecrease, onFontIncrease }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <RiFontSize size={30} />
      </PopoverTrigger>

      <PopoverContent className="dark:bg-book-dark dark:text-book-dark">
        <div className="flex items-center justify-center space-x-3 p-3">
          <button onClick={onFontDecrease}>
            <FaMinus />
          </button>
          <button onClick={onFontIncrease}>
            <FaPlus />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FontOptions;
