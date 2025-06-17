import { useParams } from "react-router-dom";
import type { authorT } from "../../types/author";
const AuthorPage = ({ authors }: { authors: authorT[] }) => {
  const { id } = useParams();
  const author = authors.find((a) => a.id === id);

  return author ? (
    <>
      <div>
        <h2>{author.name}</h2>
        <p>{author.bio}</p>
        <h3>BOOKS:</h3>
        <ul>
          {author.books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </div>
    </>
  ) : (
    <h2>not found</h2>
  );
};

export default AuthorPage;
