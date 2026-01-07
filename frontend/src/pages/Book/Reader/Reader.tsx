import { useCallback, useState } from "react";
import EpubReader, { type Highlight } from "./EpubReader";
import { useSearchParams } from "react-router-dom";

type Settings = {
  highlights: Highlight[];
  lastLocation: string;
};

const ReadingPage = () => {
  const [searchParams] = useSearchParams();
  const ocaid = searchParams.get("ocaid") || "";
  const title = searchParams.get("title") || "Book";
  const [settings] = useState<Settings>({
    highlights: [],
    lastLocation: "",
  });

  const memoizedEmptyFn = useCallback(() => {}, []);

  return (
    <div>
      <EpubReader
        ocaid={ocaid}
        title={title}
        highlights={settings.highlights}
        lastLocation={settings.lastLocation}
        onHighlight={memoizedEmptyFn}
        onHighlightClear={memoizedEmptyFn}
        onLocationChanged={memoizedEmptyFn}
      />
    </div>
  );
};

export default ReadingPage;
