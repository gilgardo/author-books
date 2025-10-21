import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import toast from "react-hot-toast";
import authkeys from "./authKeys";
import { useEffect } from "react";

export const useLogging = () => {
  const user = useQuery({
    ...authkeys.me,
    staleTime: Infinity,
    throwOnError: false,
  });

  const csrf = useQuery({
    ...authkeys.csrf_token,
    enabled: !!user.data,
    staleTime: Infinity,
    throwOnError: false,
  });

  useEffect(() => {
    const interceptorId = api.interceptors.request.use((config) => {
      if (
        csrf.data?.csrfToken &&
        ["post", "put", "patch", "delete"].includes(config.method || "")
      ) {
        config.headers["X-CSRF-Token"] = csrf.data?.csrfToken;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptorId);
    };
  }, [csrf.data?.csrfToken]);

  return {
    user: user.data,
    csrfToken: csrf.data?.csrfToken,
    isPending: user.isPending || csrf.isPending,
    isError: user.isError || csrf.isError,
    isAuth: !!user.data && !!csrf.data,
  };
};

export const useLoggOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post("user/logout"),
    onSuccess: () => queryClient.invalidateQueries(authkeys.me),
    onError: (error) => toast.error(error.message),
  });
};
