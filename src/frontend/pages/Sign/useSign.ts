import type { AuthedUser, SignInUser, SignUpUser } from "@/types/user";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const sign = async ({
  userData,
  path,
}: {
  userData: SignInUser | SignUpUser;
  path: "signUp" | "signIn";
}) => {
  const res = await api.post(`/auth/${path}`, userData);
  return res.data as AuthedUser;
};
const useSign = (path: "signUp" | "signIn") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: SignInUser | SignUpUser) => sign({ userData, path }),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(`welcome ${user.userName}`);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; type?: string }>;
      const message = err.response?.data?.message ?? err.message;
      toast.error(message);
    },
  });
};

export default useSign;
