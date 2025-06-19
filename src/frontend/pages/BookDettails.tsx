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
  if (isPending) return <div>...</div>;
  if (isError) return <div>Error</div>;

  return <div>{book.volumeInfo.title}</div>;
};

export default BookDettails;
