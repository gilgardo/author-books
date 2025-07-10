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
  isPlaceholderData,
}: {
  doc: OpenLibrarySearchDoc;
  handleClick: (key: string) => void;
  isPlaceholderData: boolean;
}) => {
  const key = doc.key.replace("/works/", "");

  return (
    <Card
      onClick={() => handleClick(key)}
      className={clsx(
        isPlaceholderData ? "bg-green/40" : "bg-green/80 hover:bg-green",
        "shadow-md rounded-2xl overflow-hidden transition-transform hover:shadow-2xl flex flex-col cursor-pointer",
        "h-full" // inherit container grid height
      )}>
      <CardHeader className="flex-0">
        <CardTitle
          className="text-base font-semibold text-gray-800 text-center line-clamp-2"
          title={doc.title}>
          {doc.title}
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
            className="text-xs text-center text-light line-clamp-1 w-full"
            title={doc.author_name.join(", ")}>
            {doc.author_name.join(", ")}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookSearchCard;
