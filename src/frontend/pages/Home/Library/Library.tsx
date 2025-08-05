import { useParams } from "react-router-dom";
import { useLibrarySearch } from "../librariesHook";
import SearchCard from "../../Book/Search/SearchCard";
import CardLoader from "../../Book/Search/CardLoader";

const Library = () => {
  const { id } = useParams();
  const { data: books, isPending, isPlaceholderData } = useLibrarySearch(id);

  const handleClick = () => {};
  const handlePrefetch = () => {};
  console.log("lib", id);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-fr">
      {isPending
        ? Array.from({ length: 12 }).map((__, i) => (
            <CardLoader key={i + "book load"} />
          ))
        : books?.map((doc) => (
            <SearchCard
              key={doc.key}
              doc={doc}
              handleClick={handleClick}
              handlePrefetch={handlePrefetch}
              isPlaceholderData={isPlaceholderData}
            />
          ))}
    </div>
  );
};

export default Library;
