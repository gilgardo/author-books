import { useSearchParams } from "react-router-dom";
import { useBooksDettails } from "../useQueryCustomHooks/useBookDettails";

const BookDettails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const query = searchParams.get("q") || "";
  const page = searchParams.get("page") || "";

  const {
    data: book,
    isError,
    isPending,
  } = useBooksDettails(id, query, Number(page));

  if (isPending) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Error loading book</div>;

  const { volumeInfo } = book;
  const {
    title,
    imageLinks,
    authors,
    description,
    publisher,
    publishedDate,
    categories,
    pageCount,
    previewLink,
    infoLink,
  } = volumeInfo;

  return (
    <div className="md:ml-100 px-6 py-8 flex flex-col">
      <h1 className="font-bold text-2xl md:text-3xl text-green mb-6">
        {title}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={imageLinks?.thumbnail || ""}
            alt={title}
            className="w-90 h-140 object-cover rounded-md shadow-md mb-4"
          />
          {authors && (
            <div className="text-sm text-gray-700 text-center lg:text-left">
              <p className="font-semibold mb-1">
                Author{authors.length > 1 ? "s" : ""}:
              </p>
              {authors.map((author) => (
                <p key={author}>{author}</p>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-4 text-gray-800">
          {description && (
            <>
              <h2 className="text-xl text-dark font-bold">Description</h2>
              <p className="text-sm leading-relaxed">{description}</p>
            </>
          )}
          <div className="text-sm space-y-1">
            {publisher && (
              <p>
                <span className="font-medium">Publisher:</span> {publisher}
              </p>
            )}
            {publishedDate && (
              <p>
                <span className="font-medium">Published:</span> {publishedDate}
              </p>
            )}
            {categories && categories.length > 0 && (
              <p>
                <span className="font-medium">Categories:</span>{" "}
                {categories.join(", ")}
              </p>
            )}
            {pageCount && (
              <p>
                <span className="font-medium">Pages:</span> {pageCount}
              </p>
            )}
          </div>

          {(previewLink || infoLink) && (
            <div className="pt-2 flex flex-col gap-2">
              {previewLink && (
                <a
                  href={previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm hover:text-blue-800">
                  Preview this book
                </a>
              )}
              {infoLink && (
                <a
                  href={infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm hover:text-blue-800">
                  More information
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDettails;
