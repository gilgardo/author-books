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
  const defaultUser: Omit<User, "id"> = {
    email: "",
    userName: "",
    password: "",
  };

  const fields: (keyof typeof defaultUser)[] = [
    "email",
    "userName",
    "password",
  ];
  const { mutate } = useSignUp();
  const form = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value }) => {
      console.log("sub");
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
          {fields.map((key) => (
            <form.Field
              key={key}
              name={key}
              children={(field) => (
                <div className="grid gap-2">
                  <Label htmlFor={key}>
                    {key[0].toLowerCase() + key.slice(1)}
                  </Label>
                  <Input
                    id={key}
                    type={key}
                    placeholder="m@example.com"
                    required
                    value={field.state.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                  />
                </div>
              )}
            />
          ))}
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={form.handleSubmit} type="submit" className="w-full">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
