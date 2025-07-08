import type { SignInUser, SignUpUser } from "@/types/user";
import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { TextField } from "./TextField";
import Footer from "./Footer";
import Error from "./Error";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {
    Footer,
    Error,
  },
});

const useSignForm = (
  defaultUser: SignInUser | SignUpUser,
  handleSubmit: (defaultUser: SignInUser | SignUpUser) => void
) => {
  return useAppForm({
    defaultValues: defaultUser,

    validators: {
      onSubmit: ({ value }) => {
        if (Object.values(value).some((val) => val === ""))
          return "Please fill in all fields";
      },
    },
    onSubmit: async ({ value }) => {
      await handleSubmit(value);
    },
  });
};

export default useSignForm;
