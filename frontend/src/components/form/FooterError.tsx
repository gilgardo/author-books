import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useFormContext } from "./useAppForm";

const FooterError = () => {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) => state.errors}
      children={(errors) =>
        errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errors}</AlertDescription>
          </Alert>
        )
      }
    />
  );
};

export default FooterError;
