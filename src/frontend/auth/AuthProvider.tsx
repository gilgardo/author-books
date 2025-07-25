import { useLoggin } from "./useLogg";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isPending } = useLoggin();

  const authValue = user
    ? { user, isAuth: true, isPending }
    : { user: null, isAuth: false, isPending };

  return <AuthContext value={authValue}>{children}</AuthContext>;
};
