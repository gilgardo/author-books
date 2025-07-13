import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

import Info from "./pages/Info";
import MainLayout from "./layouts/MainLayout";
import BookViewer from "./pages/Bookviewer";
import SignUp from "./pages/Sign/SignUp";
import SignIn from "./pages/Sign/SignIn";
import Search from "./pages/Book/Search/Search";
import Details from "./pages/Book/Dettails/Details";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "books/search", element: <Search /> },
      { path: "book", element: <Details /> },
      { path: "book/:id/view", element: <BookViewer /> },
      { path: "info", element: <Info /> },
      { path: "signIn", element: <SignIn /> },
      { path: "signUp", element: <SignUp /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
