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

const SignUp = () => {
  const { isAuth } = useAuth();
  const { mutateAsync } = useSign("signUp");
  const form = useSignForm(
    {
      email: "",
      userName: "",
      password: "",
      confirm: "",
    },
    mutateAsync
  );

  if (isAuth) return <Navigate to="/" replace />;
  return (
    <Card className="w-full max-w-sm m-auto">
      <CardHeader>
        <CardTitle>Register to your account</CardTitle>
        <CardDescription>
          Enter your data below to register your account
        </CardDescription>
        <CardAction>
          <Button variant="link">
            <Link to={"/signIn"}>Sign In</Link>
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
            name="userName"
            children={(field) => (
              <field.TextField
                id="userName"
                label="Username"
                placeholder="user"
              />
            )}
          />
          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField id="password" label="Password" type="password" />
            )}
          />
          <form.AppField
            name="confirm"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) =>
                value !== fieldApi.form.getFieldValue("password") &&
                "Password do not match",
            }}
            children={(field) => (
              <field.TextField id="confirm" label="Confirm" type="password" />
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

export default SignUp;
