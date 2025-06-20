import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="md:ml-100 px-10 py-8 flex flex-col justify-end">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
