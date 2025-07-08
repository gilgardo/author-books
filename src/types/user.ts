import type { User } from "@prisma/client";

export type SignInUser = { email: string; password: string };
export type SignUpUser = Omit<User, "id"> & { confirm: string };
export type AuthedUser = Omit<User, "password">;
