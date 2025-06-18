import { Routes, Route } from "react-router-dom";
import { authors } from "../data/authors_data";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import BooksSearch from "./pages/BooksSearch";

const MainSection = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage authors={authors} />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/books/search/" element={<BooksSearch />} />
    </Routes>
  );
};

export default MainSection;
