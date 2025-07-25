import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAddLibForm from "./useAddLibForm";
import { useMutateLibrary } from "./librariesHook";

export const LibraryDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  const { mutate } = useMutateLibrary();
  const form = useAddLibForm({ name: "" }, mutate);
  return (
    <Dialog>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        <DialogTrigger asChild>
          <Button variant="outline">{trigger}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Library</DialogTitle>
            <DialogDescription>
              Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form.AppField
            name="name"
            children={(field) => (
              <field.TextField
                id="name"
                type="text"
                label="name"
                placeholder="Reading"
              />
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <form.AppForm>
              <form.Footer submitLabel="Save" />
            </form.AppForm>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default LibraryDialog;
