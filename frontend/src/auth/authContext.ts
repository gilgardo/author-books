import { createContext } from "react";
import type { User as PrismaUser } from "@prisma/client";

export type User = Omit<PrismaUser, "password">;

export type AuthContextType = {
  user: User | null | undefined;

  isPending: boolean;
  isError: boolean;
  isAuth: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuth: false,
  isPending: true,
  isError: false,
});
