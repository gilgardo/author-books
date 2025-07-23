import type { User } from "@/frontend/auth/authContext";
import userKey from "./userKey";
import { useLibrariesSearch } from "./useLiraries";

const Logged = ({ user }: { user: User }) => {
  const { data, isLoading } = useLibrariesSearch();
  console.log(data);
  return (
    <>
      <h2 className="text-dark text-xl md:text-2xl">
        Your Libraries{" "}
        <span className="font-bold text-primary">{user.userName}</span>:
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-fr"></div>
    </>
  );
};

export default Logged;
