import { useAppForm } from "@/frontend/components/form/useAppForm";
import type { SignInUser, SignUpUser } from "@/types/user";

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
      handleSubmit(value);
    },
  });
};

export default useSignForm;
