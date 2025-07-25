import type { User } from "@/frontend/auth/authContext";
import defaultFn from "@/utils/defaultFn";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { type Library } from "@prisma/client";

const userkey = createQueryKeys("user", {
  all: null,
  logged: {
    queryKey: null,
    queryFn: defaultFn<User>,
  },
  libraries: {
    queryKey: null,
    queryFn: defaultFn<Library[]>,
    contextQueries: {
      id: (id: string) => ({
        queryKey: [id],
        queryFn: defaultFn<Library>,
      }),
    },
  },
});

export default userkey;
