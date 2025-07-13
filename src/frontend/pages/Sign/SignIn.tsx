import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSignForm from "./signForm/useSignForm";
import useSign from "./useSign";
import { useAuth } from "../../auth/useAuth";
import { Link, Navigate } from "react-router-dom";

const SignIn = () => {
  const { isAuth } = useAuth();
  const { mutate } = useSign("signIn");
  const form = useSignForm(
    {
      email: "",
      password: "",
    },
    mutate
  );
  if (isAuth) return <Navigate to="/" replace />;

  return (
    <Card className="w-full max-w-sm m-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your data below to Sign in</CardDescription>
        <CardAction>
          <Button variant="link">
            <Link to={"/signUp"}>Sign In</Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}>
          <form.AppField
            name="email"
            children={(field) => (
              <field.TextField
                id="email"
                type="email"
                label="Email"
                placeholder="exe@exemple.com"
              />
            )}
          />

          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField id="password" label="Password" type="password" />
            )}
          />
          <form.AppForm>
            <form.Error />
          </form.AppForm>
        </form>
      </CardContent>

      <form.AppForm>
        <form.Footer submitLabel="Submit" />
      </form.AppForm>
    </Card>
  );
};

export default SignIn;
