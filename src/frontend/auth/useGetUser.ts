import { useQuery } from "@tanstack/react-query";
import type { User } from "./authContext";
import api from "../../utils/api";

const getUser = async () => {
  const { data } = await api.get(`/user`);
  return data.user as User;
};

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    staleTime: Infinity,
    throwOnError: false,
  });
}
