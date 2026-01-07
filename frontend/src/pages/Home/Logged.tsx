import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useLibrariesSearch } from "./librariesHook";
import type { User } from "@/auth/authContext";
import LibraryDialog from "./LibraryDialog";
import { Link, Outlet, useParams } from "react-router-dom";

const Logged = ({ user }: { user: User }) => {
  const { id } = useParams();
  console.log("logged");
  const { data: libraries, isLoading } = useLibrariesSearch();

  if (isLoading) return <div>Loading libraries...</div>;

  return (
    <div className="w-full h-full flex flex-col items-start justify-center">
      <div className="rounded-2xl shadow-md p-4 bg-accent/60 border border-primary mx-auto mb-auto w-full">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-dark text-xl md:text-2xl">
            Your Libraries{" "}
            <span className="font-bold text-primary">{user.userName}</span>:
          </h2>

          <LibraryDialog
            trigger={
              <div className="rounded-full bg-primary hover:bg-secondary/50 hover:border-2 border-primary text-accent hover:text-primary transition cursor-pointer flex items-center justify-center w-10 h-10">
                <Plus className="w-5 h-5 " />
              </div>
            }
          />
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-fr items-center">
          {libraries?.map((lib) => (
            <Link
              key={lib.id + lib.name}
              to={`/library/${lib.id}?lib=${encodeURIComponent(lib.name)}`}>
              <Card
                className={`rounded-2xl shadow-sm hover:shadow-xl transition cursor-pointer border border-primary h-full ${
                  lib.id.toString() === id && "bg-secondary/60"
                }`}>
                <CardHeader className="p-3">
                  <CardTitle
                    className="text-xl font-semibold text-primary line-clamp-2 text-center"
                    title={lib.name}>
                    {lib.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Logged;
