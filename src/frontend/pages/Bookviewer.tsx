import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ForwardIcon,
  BackwardIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/solid";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useGoogleBooks } from "../customHooks/useGoogleBooks";

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

const BookViewer = () => {
  const params = useParams();
  const id = params.id;
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<GoogleBooksViewer | null>(null);
  const [pageState, handlePageState] = useLocalStorage(id ?? "", "");
  const [isLoaded, setIsLoaded] = useState(false);
  const ready = useGoogleBooks();

  useEffect(() => {
    if (!ready || !id) return;
    window.google.books.setOnLoadCallback(() => {
      const v = new window.google.books.Viewer(viewerRef.current);
      v.load(id);
      setViewer(v);
    });
  }, [ready, id]);

  useEffect(() => {
    if (isLoaded) return;
    const setPageInterval = setInterval(() => {
      if (!viewer?.isLoaded()) return;
      if (pageState !== "") viewer.goToPageId(pageState);
      clearInterval(setPageInterval);
      viewer.resize();
      setIsLoaded(true);
    }, 500);
    return () => clearInterval(setPageInterval);
  }, [viewer, pageState, isLoaded]);

  const handlePageChange = (cb: () => void) => {
    console.log(viewerRef.current?.children[0]);
    console.log(viewer?.getPageNumber);
    handlePageState(viewer?.getPageId() ?? "");
    cb();
  };

  if (!id) return <div>Error</div>;

  return (
    <div className="flex justify-center">
      {viewer && isLoaded && (
        <div className="flex flex-col justify-start items-start gap-10 rounded-l-md  bg-green/80 p-3">
          <ForwardIcon
            className="text-light cursor-pointer size-7"
            onClick={() => handlePageChange(viewer.nextPage)}
          />

          <BackwardIcon
            className="text-light cursor-pointer size-7"
            onClick={() => handlePageChange(viewer.previousPage)}
          />

          <MagnifyingGlassPlusIcon
            className="text-light cursor-pointer size-7"
            onClick={viewer.zoomIn}
          />

          <MagnifyingGlassMinusIcon
            className="text-light cursor-pointer size-7"
            onClick={viewer.zoomOut}
          />
        </div>
      )}
      <div key={id} ref={viewerRef} className="h-250 w-[70%]" />
    </div>
  );
};

export default BookViewer;
