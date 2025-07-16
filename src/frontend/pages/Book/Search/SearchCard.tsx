import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { OpenLibrarySearchDoc } from "@/types/openLibrary";
import coverUrlFactory from "@/utils/coverUrlFactory";
import clsx from "clsx";

const BookSearchCard = ({
  doc,
  handleClick,
  handlePrefetch,
  isPlaceholderData,
}: {
  doc: OpenLibrarySearchDoc;
  handleClick: (workKey: string, editionKey: string) => void;
  handlePrefetch: (workKey: string, editionKey: string) => void;
  isPlaceholderData: boolean;
}) => {
  const workKey = doc.key.replace("/works/", "");
  const editionKey = doc.cover_edition_key ?? "";
  const isReadable = doc.ebook_access === "public";

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
        <img
          className="w-auto h-[10rem] sm:h-[12rem] md:h-[14rem] object-cover rounded-md"
          src={coverUrlFactory(doc.cover_i).M}
          alt={doc.title}
        />
      </CardContent>

      <CardFooter className="flex-0">
        {doc.author_name && (
          <p
            className="text-xs text-center text-primary line-clamp-1 w-full"
            title={doc.author_name.join(", ")}>
            {doc.author_name.join(", ")}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookSearchCard;
