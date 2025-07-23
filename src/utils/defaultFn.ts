import type { QueryFunctionContext } from "@tanstack/react-query";
import api from "./api";
import type { AxiosError } from "axios";

const defaultFn = async <T = unknown>(ctx: QueryFunctionContext) => {
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

export default defaultFn