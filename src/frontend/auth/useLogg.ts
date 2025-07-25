import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userkey from "../pages/Home/userKey";
import api from "@/utils/api";
import toast from "react-hot-toast";

export const useLoggin = () => {
  return useQuery({
    ...userkey.logged,
    staleTime: Infinity,
    throwOnError: false,
  });
};

export const useLoggOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post("user/logout"),
    onSuccess: () => queryClient.invalidateQueries(userkey.logged),
    onError: (error) => toast.error(error.message),
  });
};
