import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import defaultFn from "@/utils/defaultFn.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (_, query) => {
        return typeof query.state.data === "undefined";
      },
      staleTime: 60 * 1000,
      queryFn: defaultFn,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (typeof query.state.data !== "undefined") {
        toast.error(error.message);
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
