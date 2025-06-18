import { maxResults } from "../../data/maxResults";

const BooksSearchLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
      {Array.from({ length: maxResults }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="bg-green/40 shadow-md rounded-2xl overflow-hidden animate-pulse flex flex-col justify-between p-4 min-h-[320px]">
          <div className="flex flex-col items-center text-center">
            <div className="h-48 w-40 bg-light rounded-md mb-3" />
            <div className="h-6 w-32 bg-light rounded mt-2" />
          </div>
          <div className="h-4 w-24 bg-light rounded mt-6 mx-auto" />
        </div>
      ))}
    </div>
  );
};

export default BooksSearchLoader;
