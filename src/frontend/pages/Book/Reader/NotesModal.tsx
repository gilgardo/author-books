import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Book } from "epubjs";
import { type FC, useEffect, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";

interface Props {
  book?: Book;
  notes?: string[];
  onNoteClick?(path: string): void;
}

const NotesModal: FC<Props> = ({
  book,
  notes,

  onNoteClick,
}) => {
  const [data, setData] = useState<{ note: string; cfi: string }[]>([]);

  useEffect(() => {
    if (!notes || !book) return;

    const newNotes = Promise.all(
      notes.map(async (cfi) => {
        const note = (await book.getRange(cfi)).toString();
        return { note, cfi };
      })
    );

    newNotes.then(setData);
  }, [notes, book]);

  return (
    <Dialog>
      <DialogTrigger>
        <MdOutlineStickyNote2 size={30} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center">
          Notes & Highlights
        </DialogHeader>
        <DialogContent className="flex flex-col gap-6 items-center">
          {data.map((item) => {
            return (
              <Card key={item.cfi} className="max-w-2xl">
                <CardContent>
                  <DialogClose
                    className="cursor-pointer"
                    onClick={() => {
                      onNoteClick?.(item.cfi);
                    }}>
                    <p className="line-clamp-3">{item.note}</p>
                  </DialogClose>
                </CardContent>
              </Card>
            );
          })}
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};

export default NotesModal;
