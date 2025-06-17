import type { ReactNode } from "react";
import { NavLink, type To } from "react-router-dom";

const NavBarLink = ({ children, to }: { children: ReactNode; to: To }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <span className={`${isActive && "text-light"} text-sm font-bold`}>
          {children}
        </span>
      )}
    </NavLink>
  );
};

export default NavBarLink;
