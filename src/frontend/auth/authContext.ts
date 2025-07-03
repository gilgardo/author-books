import { createContext } from "react";

export type User = {
  id: number;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  isAuth: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuth: false,
});
