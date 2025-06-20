import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import BooksSearch from "./pages/BooksSearch";
import BookDetails from "./pages/BookDetails";
import Info from "./pages/InfoPage";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    // Public layout (e.g., Home, Search, BookDetails)
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "books/search", element: <BooksSearch /> },
      { path: "book", element: <BookDetails /> },
      { path: "info", element: <Info /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
