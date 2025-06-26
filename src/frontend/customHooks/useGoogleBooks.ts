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

let scriptAdded = false;
let isBooksApiReady = false;
const callbacks: (() => void)[] = [];

export const useGoogleBooks = (
  canvasRef: React.RefObject<HTMLDivElement | null>,
  id: string
) => {
  const [viewer, setViewer] = useState<null | GoogleBooksViewer>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

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

    const runOrQueueCallback = (cb: () => void) => {
      if (isBooksApiReady) {
        cb();
      } else {
        callbacks.push(cb);
      }
    };

    if (window.google?.books) {
      if (!isBooksApiReady) {
        window.google.books.load();
        window.google.books.setOnLoadCallback(() => {
          isBooksApiReady = true;
          callbacks.forEach((fn) => fn());
          callbacks.length = 0;
        });
      }
      runOrQueueCallback(initViewer);
    } else if (!scriptAdded) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/books/jsapi.js";
      script.id = "google_script";
      script.onload = () => {
        if (window.google?.books) {
          window.google.books.load();
          window.google.books.setOnLoadCallback(() => {
            isBooksApiReady = true;
            callbacks.forEach((fn) => fn());
            callbacks.length = 0;
          });
        }
      };
      script.onerror = () => {
        console.error("Failed to load Google Books API.");
      };
      document.body.appendChild(script);
      scriptAdded = true;

      runOrQueueCallback(initViewer);
    } else {
      runOrQueueCallback(initViewer);
    }
  }, [id, canvasRef]);

  return viewer;
};
