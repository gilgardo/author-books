import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useLoggOut } from "@/frontend/auth/authHooks";
import { useAuth } from "@/frontend/auth/useAuth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

const ProfilePopover = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { mutate } = useLoggOut();
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        {user ? (
          <Card>
            <CardHeader className="text-primary font-bold ">
              <h3>Profile</h3>
            </CardHeader>
            <CardContent>
              <div>
                User:{" "}
                <span className="text-primary/60 font-semibold">
                  {"  " + user.userName}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              {" "}
              <Button
                variant="outline"
                className="text-primary font-semibold"
                onClick={() => mutate()}>
                LoggOut
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Button
            variant="outline"
            className="text-primary font-semibold"
            onClick={() => mutate()}>
            LoggOut
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
