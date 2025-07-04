import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import BooksSearch from "./pages/BooksSearch";
import BookDetails from "./pages/BookDetails";
import Info from "./pages/Info";
import MainLayout from "./layouts/MainLayout";
import BookViewer from "./pages/Bookviewer";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "books/search", element: <BooksSearch /> },
      { path: "book", element: <BookDetails /> },
      { path: "book/:id/view", element: <BookViewer /> },
      { path: "info", element: <Info /> },
      // { path: "signIn", element: <SignIn /> },
      { path: "signUp", element: <SignUp /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
