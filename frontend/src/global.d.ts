export {};

import type { User as PrismaUser } from "@prisma/client";

interface GoogleBooksViewer {
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

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends PrismaUser {}
  }

  interface Window {
    google: {
      books: {
        load: () => void;
        setOnLoadCallback: (callback: () => void) => void;
        Viewer: new (element: HTMLElement | null) => GoogleBooksViewer;
      };
    };
  }
}
