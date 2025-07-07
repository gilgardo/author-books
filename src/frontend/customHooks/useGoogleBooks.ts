import { useScript } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export interface GoogleBooksViewer {
  load: (bookId: string, options?: object) => boolean;
  isLoaded: () => boolean;
  getPageNumber: () => number;
  getPageId: () => string;
  goToPage: (pageNumber: number) => void;
  goToPageId: (pageId: string) => void;
  nextPage: () => void;
  previousPage: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resize: () => void;
  highlight: (query: string) => void;
}
let isBooksApiLoaded = false;

export const useGoogleBooks = (
  canvasRef: React.RefObject<HTMLDivElement | null>,
  id: string
) => {
  const [viewer, setViewer] = useState<null | GoogleBooksViewer>(null);
  const status = useScript("https://www.google.com/books/jsapi.js", {
    removeOnUnmount: true,
  });

  if (status === "error") throw new Error("google books script does not load");

  useEffect(() => {
    if (typeof window === "undefined" || status !== "ready") return;

    const initViewer = () => {
      const container = canvasRef.current;
      if (!container) {
        console.warn("Canvas container not ready.");
        return;
      }

      const v = new window.google.books.Viewer(container);
      v.load(id);
      setViewer(v);
    };

    if (!isBooksApiLoaded) {
      window.google.books.load();
      window.google.books.setOnLoadCallback(() => {
        isBooksApiLoaded = true;
        initViewer();
      });
      return;
    }
    initViewer();
  }, [id, canvasRef, status]);

  return viewer;
};
