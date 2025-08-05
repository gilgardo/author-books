import type { ReactNode } from "react";
import { NavLink, type To } from "react-router-dom";

const NavBarLink = ({
  children,
  to,
  reset,
}: {
  children: ReactNode;
  to: To;
  reset?: () => void;
}) => {
  return (
    <NavLink to={to} onClick={reset}>
      {({ isActive }) => (
        <span className={`${isActive && "text-secondary"} text-sm font-bold`}>
          {children}
        </span>
      )}
    </NavLink>
  );
};

export default NavBarLink;
