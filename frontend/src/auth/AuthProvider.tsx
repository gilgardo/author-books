import { useLogging } from "./authHooks";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authValue = useLogging();

  return <AuthContext value={authValue}>{children}</AuthContext>;
};
