import { Routes, Route } from "react-router-dom";
import { authors } from "../data/authors_data";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";

const MainSection = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage authors={authors} />} />
      <Route path="/info" element={<InfoPage />} />
    </Routes>
  );
};

export default MainSection;
