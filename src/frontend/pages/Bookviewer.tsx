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
import ViewerIcon from "../components/ViewerIcon";
import { ErrorBoundary } from "react-error-boundary";
import ViewerFallback from "../components/ViewerFallback";

class MissingIdError extends Error {
  type: string;
  constructor(message = "No ID provided") {
    super(message);
    this.type = "id";
  }
}

const WIDTH_TO_ZOOM_LEVELS = [
  400,
  600,
  768,
  960,
  1120,
  1280,
  1440,
  1600,
  Infinity,
];
const MAX_ZOOM_LEVEL = WIDTH_TO_ZOOM_LEVELS.length - 1;
const MIN_ZOOM_LEVEL = 0;

const BookViewer = () => {
  const params = useParams();
  const id = params.id ?? "";
  const [zoomLevel, setZoomLevel] = useState(4);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewer = useGoogleBooks(viewerRef, id);
  const [pageState, handlePageState] = useLocalStorage(id, "");
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    let resizeFrame: number | null = null;

    const getZoomLevelFromWidth = (width: number) =>
      WIDTH_TO_ZOOM_LEVELS.findIndex((maxWidth) => width <= maxWidth);

    const adaptZoomToWidth = (
      current: number,
      target: number,
      zoomFn: () => void,
      increment: number,
      testFn: (a: number, b: number) => boolean
    ) => {
      if (
        (current <= MIN_ZOOM_LEVEL && increment < 0) ||
        (current >= MAX_ZOOM_LEVEL && increment > 0) ||
        !testFn(current, target)
      ) {
        setZoomLevel(target);
        return;
      }
      zoomFn();
      const next = current + increment;
      setZoomLevel(next);
      adaptZoomToWidth(next, target, zoomFn, increment, testFn);
    };

    const handleResize = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (!viewer?.isLoaded()) return;
        const targetLevel = getZoomLevelFromWidth(window.innerWidth);
        if (zoomLevel < targetLevel) {
          adaptZoomToWidth(
            zoomLevel,
            targetLevel,
            viewer.zoomIn,
            1,
            (a, b) => a < b
          );
        } else if (zoomLevel > targetLevel) {
          adaptZoomToWidth(
            zoomLevel,
            targetLevel,
            viewer.zoomOut,
            -1,
            (a, b) => a > b
          );
        }
        viewer.resize();
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
    };
  }, [viewer, zoomLevel]);

  const handlePageChange = (cb: (() => void) | undefined) => {
    cb?.();
    handlePageState(viewer?.getPageId() ?? "");
  };

  if (!id) throw new MissingIdError();

  const viewerIcons = [
    {
      Icon: ForwardIcon,
      handleClick: () => handlePageChange(viewer?.nextPage),
    },
    {
      Icon: BackwardIcon,
      handleClick: () => handlePageChange(viewer?.previousPage),
    },
    {
      Icon: MagnifyingGlassPlusIcon,
      handleClick: () => {
        if (zoomLevel >= MAX_ZOOM_LEVEL) return;
        viewer?.zoomIn();
        setZoomLevel((prev) => prev + 1);
      },
    },
    {
      Icon: MagnifyingGlassMinusIcon,
      handleClick: () => {
        if (zoomLevel <= MIN_ZOOM_LEVEL) return;
        viewer?.zoomOut();
        setZoomLevel((prev) => prev - 1);
      },
    },
  ];

  return (
    <ErrorBoundary FallbackComponent={ViewerFallback}>
      <div className="flex justify-center sm:flex-row flex-col">
        {viewer && isLoaded && (
          <div className="flex sm:flex-col sm:justify-start justify-between items-start gap-10 rounded-t-md sm:rounded-l-md sm:rounded-t-none sm:bg-green/80 p-3">
            {viewerIcons.map((icon, ind) => (
              <ViewerIcon key={`icon-${ind}`} {...icon} />
            ))}
          </div>
        )}
        <div key={id} ref={viewerRef} className="h-250 sm:w-[70%] w-full" />
      </div>
    </ErrorBoundary>
  );
};

export default BookViewer;
