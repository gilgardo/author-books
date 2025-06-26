import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="sm:px-10 px-3 py-8 flex flex-col justify-end">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
