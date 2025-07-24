import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useLibrariesSearch } from "./librariesHook";
import type { User } from "@/frontend/auth/authContext";

const Logged = ({ user }: { user: User }) => {
  const { data: libraries, isLoading } = useLibrariesSearch();

  if (isLoading) return <div>Loading libraries...</div>;

  return (
    <div className="rounded-2xl shadow-md p-4 bg-accent/60 border border-primary mx-auto mb-auto w-full">
      <h2 className="text-dark text-xl md:text-2xl mb-4">
        Your Libraries{" "}
        <span className="font-bold text-primary">{user.userName}</span>:
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-fr items-center">
        {libraries?.map((lib) => (
          <Card
            key={lib.id}
            className="rounded-2xl shadow-sm hover:shadow-xl transition cursor-pointer border border-primary h-full">
            <CardHeader className="p-3">
              <CardTitle
                className="text-xl font-semibold text-primary line-clamp-2 text-center"
                title={lib.name}>
                {lib.name}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}

        <Card
          onClick={() => {
            // trigger modal or form
          }}
          className="rounded-full border-dashed border-2 border-primary/70 hover:bg-secondary/50 transition cursor-pointer flex items-center justify-center w-20 h-20">
          <Plus className="w-6 h-6 text-primary" />
        </Card>
      </div>
    </div>
  );
};

export default Logged;
