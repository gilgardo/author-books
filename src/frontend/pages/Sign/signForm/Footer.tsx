import { Button } from "@/components/ui/button";
import { useFormContext } from "./useSignForm";
import { CardFooter } from "@/components/ui/card";

const Footer = ({ submitLabel }: { submitLabel: string }) => {
  const form = useFormContext();
  return (
    <CardFooter className="flex gap-2">
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            className="w-[48%]"
            type="submit"
            onClick={form.handleSubmit}
            disabled={!canSubmit}>
            {isSubmitting ? "..." : `${submitLabel}`}
          </Button>
        )}
      />
      <Button
        variant="outline"
        onClick={() => form.reset()}
        className="w-[48%]">
        Reset
      </Button>
    </CardFooter>
  );
};

export default Footer;
