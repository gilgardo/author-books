import { BookOpenIcon } from "@heroicons/react/24/solid";
import NavLink from "./components/NavLink";

const NavBar = () => {
  const user = false;
  return (
    <nav className="flex justify-between w-full h-[15%] bg-green/80 backdrop-blur-md shadow-md py-3">
      <div className="flex justify-between gap-10 ml-40">
        <NavLink to="/">
          <BookOpenIcon className="text-ligth size-6" />
        </NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/info">Info</NavLink>
      </div>
      {!user && (
        <div className="flex justify-between gap-10 mr-40">
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/signIn">SignIn</NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
