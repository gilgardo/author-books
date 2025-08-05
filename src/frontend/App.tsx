import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";

import Info from "./pages/Info";
import MainLayout from "./layouts/MainLayout";
import SignUp from "./pages/Sign/SignUp";
import SignIn from "./pages/Sign/SignIn";
import Search from "./pages/Book/Search/Search";
import Details from "./pages/Book/Dettails/Details";
import ReadingPage from "./pages/Book/Reader/Reader";
import Library from "./pages/Home/Library/Library";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [{ path: "library/:id", element: <Library /> }],
      },
      { path: "books/search", element: <Search /> },
      { path: "book", element: <Details /> },
      { path: "viewer", element: <ReadingPage /> },
      { path: "info", element: <Info /> },
      { path: "signIn", element: <SignIn /> },
      { path: "signUp", element: <SignUp /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
