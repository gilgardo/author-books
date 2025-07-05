import api from "@/utils/api";
import type { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const signUp = async (userData: Omit<User, "id">) => {
  const res = await api.post("/auth/signUp", userData);
  return res.data as Omit<User, "password">;
};
const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(`welcome ${user.userName}`);
    },
  });
};

export default useSignUp;
