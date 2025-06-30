import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import Fallback from "../components/Fallback";
import MainWraper from "./MainWraper";

const MainLayout = () => {
  return (
    <>
      <Toaster position="top-center" gutter={8} />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <ErrorBoundary
              FallbackComponent={(props) => <Fallback {...props} />}
              onReset={reset}>
              <MainWraper>
                <Outlet />
              </MainWraper>
            </ErrorBoundary>
          </>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};

export default MainLayout;
