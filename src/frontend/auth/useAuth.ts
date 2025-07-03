import { useContext } from "react";
import { AuthContext } from "./authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUser() must be used within a UserProvider");
  }
  return context;
};
