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
    <div
      key={key}
      onClick={() => handleClick(key)}
      className={clsx(
        isPlaceholderData ? "bg-green/40" : "bg-green/80 hover:bg-green",
        "shadow-md rounded-2xl overflow-hidden transition-transform hover:shadow-2xl hover:scale-95 duration-200 flex flex-col justify-between p-4 cursor-pointer"
      )}>
      <div className="flex flex-col items-center text-center">
        <img
          className="h-60 w-40 object-cover rounded-md mb-3"
          src={coverUrlFactory(doc.cover_i).M}
          alt={doc.title}
        />
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {doc.title}
        </h2>
      </div>
      {doc.author_name && (
        <p className="text-sm text-light mt-4 text-center line-clamp-1">
          {doc.author_name.join(", ")}
        </p>
      )}
    </div>
  );
};

export default BookSearchCard;
