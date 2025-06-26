import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import Fallback from "../components/Fallback";

const MainLayout = () => {
  return (
    <>
      <Toaster position="top-center" gutter={8} />
      <NavBar />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={Fallback} onReset={reset}>
            <main className="sm:px-10 px-3 py-8 flex flex-col justify-end">
              <Outlet />
            </main>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};

export default MainLayout;
