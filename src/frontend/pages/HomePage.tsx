import { Link } from "react-router-dom";
import type { authorT } from "../../types/author";

const HomePage = ({ authors }: { authors: authorT[] }) => {
  return (
    <>
      <h1>Authors:</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <Link to={`/author/${author.id}`}>{author.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
