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
import { useForm } from "@tanstack/react-form";

const SignIn = () => {
  const defaultUser: { email: string; password: string } = {
    email: "",
    password: "",
  };

  const fields: (keyof typeof defaultUser)[] = ["email", "password"];

  const form = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Card className="w-full max-w-sm m-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign In</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          {fields.map((key) => (
            <form.Field
              name={key}
              children={(field) => (
                <div className="grid gap-2">
                  <Label htmlFor={key}>Email</Label>
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
        <Button type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
