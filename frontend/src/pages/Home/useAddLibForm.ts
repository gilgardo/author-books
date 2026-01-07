import { useAuth } from "@/auth/useAuth";
import { useAppForm } from "@/components/form/useAppForm";

const useAddLibForm = (
  defaultName = { name: "" },
  handleSubmit: (values: { name: string; userId: number }) => void
) => {
  const { user } = useAuth();
  return useAppForm({
    defaultValues: defaultName,

    validators: {
      onSubmit: ({ value }) => {
        if (Object.values(value).some((val) => val === ""))
          return "Please fill in all fields";
        if (!user) return "User is not logged";
      },
    },
    onSubmit: async ({ value }) => {
      if (!user) throw new Error("User is not logged");
      handleSubmit({ ...value, userId: user.id });
    },
  });
};

export default useAddLibForm;
