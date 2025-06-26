// src/global.d.ts
export {};
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
