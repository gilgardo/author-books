import defaultFn from "@/utils/defaultFn";
import { createQueryKeys } from "@lukemorales/query-key-factory";

const userkey = createQueryKeys("user", {
  all: null,
  libraries: {
    queryKey: null,
    queryFn: defaultFn,
    contextQueries: {
      id: (id: string) => ({
        queryKey: [id],
        queryFn: defaultFn,
      }),
    },
  },
});

export default userkey;
