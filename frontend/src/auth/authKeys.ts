import type { AuthedUser } from "@/types/user";
import defaultFn from "@/utils/defaultFn";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const authkeys = createQueryKeys("auth", {
  all: null,
  me: {
    queryKey: null,
    queryFn: defaultFn<AuthedUser>,
  },
  csrf_token: {
    queryKey: null,
    queryFn: defaultFn<{ csrfToken: string }>,
  },
  signUp: null,
  signIn: null,
});

export default authkeys;
