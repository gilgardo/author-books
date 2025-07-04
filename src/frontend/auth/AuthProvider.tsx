import { useGetUser } from "../useQueryCustomHooks/useGetUser";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, ...userQuery } = useGetUser();

  if (userQuery.isLoading) {
    return <div>...</div>;
  }
  const authValue = user
    ? { user, isAuth: true }
    : { user: null, isAuth: false };

  return <AuthContext value={authValue}>{children}</AuthContext>;
};
