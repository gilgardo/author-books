import { Routes, Route } from "react-router-dom";
import { authors } from "../data/authors_data";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import BooksSearch from "./pages/BooksSearch";
import BookDettails from "./pages/BookDettails";

const MainSection = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage authors={authors} />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/books/search/" element={<BooksSearch />} />
      <Route path="/book" element={<BookDettails />} />
    </Routes>
  );
};

export default MainSection;
