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
import { ScrollArea } from "@/components/ui/scroll-area";

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
            <ScrollArea className="h-[20rem] w-full rounded-md border border-primary/60 p-1 pr-4">
              {libraries?.map((lib) => (
                <div
                  key={lib.id}
                  className="flex justify-between w-full items-center rounded-md bg-primary py-2 px-4 mb-2">
                  <h4 className="leading-none font-medium text-primary-foreground">
                    {lib.name}
                  </h4>
                  <Button
                    className="cursor-pointer"
                    variant="secondary"
                    onClick={() => mutate({ book, id: lib.id.toString() })}>
                    Add
                  </Button>
                </div>
              ))}
            </ScrollArea>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="destructive">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default AddTolibraryDialog;
