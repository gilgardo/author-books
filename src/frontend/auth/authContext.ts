import { createContext } from "react";
import type { User as PrismaUser } from "@prisma/client";

export type User = Omit<PrismaUser, "password">;

export type AuthContextType = {
  user: User | null;
  isAuth: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuth: false,
});
