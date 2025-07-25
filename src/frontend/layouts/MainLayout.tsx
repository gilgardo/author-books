import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import Fallback from "./Fallback";
import MainWraper from "./MainWraper";
import { AuthProvider } from "../auth/AuthProvider";

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
              <AuthProvider>
                <MainWraper>
                  <Outlet />
                </MainWraper>
              </AuthProvider>
            </ErrorBoundary>
          </>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};

export default MainLayout;
