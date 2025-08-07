import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { OpenLibrarySearchDoc } from "@/types/openLibrary";
import coverUrlFactory from "@/utils/coverUrlFactory";
import type { Book } from "@prisma/client";
import clsx from "clsx";

const BookSearchCard = ({
  doc,
  handleClick,
  handlePrefetch,
  isPlaceholderData,
  setOpen,
  setClickedKey,
}: {
  doc: OpenLibrarySearchDoc | Book;
  handleClick: (workKey: string, editionKey: string) => void;
  handlePrefetch: (workKey: string, editionKey: string) => void;
  isPlaceholderData: boolean;
  setClickedKey?: React.Dispatch<React.SetStateAction<string>>;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const workKey = doc.key.replace("/works/", "");
  const editionKey = doc.cover_edition_key ?? "";
  const isReadable = doc.ebook_access === "public";
  console.log(isPlaceholderData && doc);
  const addToLib = (e: React.MouseEvent<HTMLButtonElement>, key: string) => {
    e.stopPropagation();
    setOpen?.(true);
    setClickedKey?.(key);
  };

  return (
    <Card
      onClick={() => handleClick(workKey, editionKey)}
      onMouseEnter={() => handlePrefetch(workKey, editionKey)}
      className={clsx(
        isPlaceholderData && "bg-primary/40",
        "shadow-md rounded-2xl overflow-hidden transition-transform hover:shadow-2xl flex flex-col cursor-pointer",
        "h-full"
      )}>
      <CardHeader className="flex-0">
        <CardTitle
          className="text-base font-semibold text-gray-800 text-center line-clamp-2"
          title={doc.title}>
          {doc.title}
          <h2
            className={`text-2xl font-bold ${
              isReadable ? "text-accent" : "text-primary/70"
            }`}>
            {isReadable ? "Readable" : "Borrowable"}
          </h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center items-center px-4">
        <div className="w-auto h-[10rem] sm:h-[12rem] md:h-[14rem]">
          <img
            className="w-full h-full object-cover rounded-md"
            src={coverUrlFactory(doc.cover_i ?? undefined, doc.ia?.[0]).M}
            alt={doc.title}
          />
        </div>
      </CardContent>

      <CardFooter className="flex-0 flex flex-row justify-between items-center">
        {doc.author_name && (
          <p
            className="text-xs text-center text-primary line-clamp-1 w-full"
            title={doc.author_name.join(", ")}>
            {doc.author_name.join(", ")}
          </p>
        )}
        {setOpen && setClickedKey && (
          <Button onClick={(e) => addToLib(e, doc.key)}>Add To Library</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookSearchCard;
