import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLibrariesSearch, useMutateLibrary } from "../../Home/librariesHook";
import type { OpenLibrarySearchDoc } from "@/types/openLibrary";

export const AddTolibraryDialog = ({
  open,
  setOpen,
  book,
}: {
  open: boolean;
  setOpen: (bool: boolean) => void;
  book: OpenLibrarySearchDoc;
}) => {
  const { data: libraries, isLoading } = useLibrariesSearch();
  const { mutate } = useMutateLibrary();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Library</DialogTitle>
            <DialogDescription>
              Click Add to add the book to the library.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <ul>
              {libraries?.map((lib) => (
                <li
                  key={lib.id}
                  className="flex justify-around w-full items-center">
                  <div>{lib.name}</div>
                  <Button
                    onClick={() => mutate({ book, id: lib.id.toString() })}>
                    Add
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default AddTolibraryDialog;
