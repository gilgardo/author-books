import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../data";
import type { User } from "../auth/authContext";

const getUser = async () => {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("bad request");
  const data = await res.json();
  return data as User;
};
// user query
export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    staleTime: Infinity,
  });
}
