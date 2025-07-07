import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@prisma/client";
import { useForm } from "@tanstack/react-form";
import useSignUp from "../useQueryCustomHooks/useSignUp";

const SignUp = () => {
  const defaultUser: Omit<User, "id"> & { confirm: string } = {
    email: "",
    userName: "",
    password: "",
    confirm: "",
  };

  const { mutate, isPending } = useSignUp();

  const form = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value }) => {
      mutate(value);
    },
  });

  return (
    <Card className="w-full max-w-sm m-auto">
      <CardHeader>
        <CardTitle>Register to your account</CardTitle>
        <CardDescription>
          Enter your data below to register your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign In</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}>
          <form.Field
            name="email"
            children={(field) => (
              <div className="grid gap-2 mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          />

          <form.Field
            name="userName"
            children={(field) => (
              <div className="grid gap-2 mb-4">
                <Label htmlFor="userName">Username</Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="username..."
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          />

          <form.Field
            name="password"
            children={(field) => (
              <div className="grid gap-2 mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password..."
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          />
          <form.Field
            name="confirm"
            children={(field) => (
              <div className="grid gap-2 mb-4">
                <Label htmlFor="confirm">Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="confirm..."
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          />
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button
          onClick={form.handleSubmit}
          disabled={isPending}
          type="submit"
          className="w-full">
          {isPending ? "..." : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
