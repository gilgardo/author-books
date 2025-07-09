import { useSearchParams } from "react-router-dom";
import { useWorkSearch } from "../useQueryCustomHooks/useWorkSearch";
// import CustomButton from "../components/CustomButton";
import BookDetailLoader from "../loaders/BookDetailLoader";
import coverUrlFactory from "@/utils/coverUrlFactory";
import { useDocSearch } from "../useQueryCustomHooks/useDocSearch";

const BookDetails = () => {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key") || "";
  const q = searchParams.get("q") || "";
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  // const isReadable = searchParams.get("page") === "true";
  // const navigate = useNavigate();
  const { data: work, isPending } = useWorkSearch(q, page, key);
  const { data: doc } = useDocSearch(q, page, key);
  if (isPending) return <BookDetailLoader />;

  return (
    work && (
      <>
        <h1 className="font-bold text-2xl md:text-3xl text-green mb-6">
          {work.title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center lg:items-start">
            <img
              src={coverUrlFactory(work.covers?.[0]).L}
              alt={work.title}
              className="w-90 h-140 object-cover rounded-md shadow-md mb-4"
            />
          </div>

          <div className="flex-1 space-y-4 text-dark">
            {work.description && (
              <>
                <h2 className="text-xl font-bold">Description</h2>
                <div
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      typeof work.description === "string"
                        ? work.description
                        : work.description?.value ?? "",
                  }}
                />
              </>
            )}
            {/* <div className="text-sm space-y-1">
              {authors && (
                <div className="text-sm text-dark text-center lg:text-left">
                  <p className="font-semibold mb-1">
                    Author{authors.length > 1 ? "s" : ""}:{" "}
                    {authors.map((author) => (
                      <span className="text-green/80" key={author}>
                        {author}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              {publisher && (
                <p>
                  <span className="font-medium">Publisher:</span> {publisher}
                </p>
              )}
              {publishedDate && (
                <p>
                  <span className="font-medium">Published:</span>{" "}
                  {publishedDate}
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
          </div>
          <div className="flex-1 space-y-4 text-dark">
            {(previewLink || infoLink) && (
              <div className="pt-2 flex flex-col gap-2">
                <h2 className="text-xl font-bold">Useful Links</h2>
                {previewLink && (
                  <CustomButton
                    onClick={() => navigate(`/book/${book.id}/view`)}>
                    Preview this book
                  </CustomButton>
                )}
                {infoLink && (
                  <CustomButton>
                    <a
                      href={infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm">
                      More info
                    </a>
                  </CustomButton>
                )}
              </div>
            )}
            */}
          </div>
        </div>
      </>
    )
  );
};

export default BookDetails;
