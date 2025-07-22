import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import api from "@/utils/api.ts";

export const defaultFn = async <T = unknown,>(ctx: QueryFunctionContext) => {
  const { queryKey, signal } = ctx;
  const possibleParams = queryKey[queryKey.length - 1] as Record<
    string,
    string | number
  >;
  const params = typeof possibleParams !== "object" ? {} : possibleParams;
  const pathSegments = queryKey.filter(
    (el) => typeof el === "string" || typeof el === "number"
  );
  const url = pathSegments.join("/");
  try {
    const { data } = await api.get(url, { params, signal });
    return data as T;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    throw new Error(err.response?.data?.message ?? err.message);
  }
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (_, query) => {
        return typeof query.state.data === "undefined";
      },
      staleTime: 60 * 100,
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
