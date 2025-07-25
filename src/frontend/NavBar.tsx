import { BookOpenIcon } from "@heroicons/react/24/solid";
import NavLink from "./components/NavLink";
import NavSearch from "./components/NavSearch";
import { Link } from "react-router-dom";
import { useAuth } from "./auth/useAuth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const NavBar = ({ reset }: { reset?: () => void }) => {
  const { isAuth } = useAuth();
  return (
    <nav className="relative z-40 flex justify-between py-3 bg-primary/80 backdrop-blur-md shadow-md">
      <div className="flex justify-between items-center gap-5 md:gap-10 ml-5 md:ml-40">
        <Link to="/">
          <BookOpenIcon className="text-secondary size-6" />
        </Link>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/info">Info</NavLink>
        <NavSearch reset={reset} />
      </div>
      {!isAuth ? (
        <div className="flex justify-between items-center gap-5 md:gap-10 mr-5 md:mr-40">
          <NavLink to="/signUp">Register</NavLink>
          <NavLink to="/signIn">SignIn</NavLink>
        </div>
      ) : (
        <div className="mr-5 md:mr-40 flex items-center">
          <Avatar>
            <AvatarImage src="/avatar.png" />
          </Avatar>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
