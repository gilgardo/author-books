import { type FC, useCallback, useEffect, useState } from "react";
import EpubReader, { type Highlight } from "./EpubReader";
import { useSearchParams } from "react-router-dom";
import { debounce } from "./debounce";

interface BookAPIRes {
  settings: Settings;
  url: string;
}

type Settings = {
  highlights: Highlight[];
  lastLocation: string;
};

// const updateLastLocation = (bookId: string, lastLocation: string) => {
//   client.post("/history", {
//     bookId,
//     lastLocation,
//     remove: false,
//   });
// };

// const debounceUpdateLastLocation = debounce(updateLastLocation, 500);

const ReadingPage = () => {
  const [searchParams] = useSearchParams();
  const ocaid = searchParams.get("ocaid") || "";
  const title = searchParams.get("title") || "Book";
  const [settings, setSettings] = useState<Settings>({
    highlights: [],
    lastLocation: "",
  });

  // const handleOnHighlightSelection = (data: Highlight) => {
  //   try {
  //     setSettings({ ...settings, highlights: [...settings.highlights, data] });
  //     client.post("/history", {
  //       bookId,
  //       highlights: [data],
  //       remove: false,
  //     });
  //   } catch (error) {
  //     parseError(error);
  //   }
  // };

  // const handleOnHighlightClear = (cfi: string) => {
  //   try {
  //     const newHighlights = settings.highlights.filter(
  //       (item) => item.selection !== cfi
  //     );

  //     setSettings({ ...settings, highlights: newHighlights });
  //     client.post("/history", {
  //       bookId,
  //       highlights: [{ selection: cfi, fill: "" }],
  //       remove: true,
  //     });
  //   } catch (error) {
  //     parseError(error);
  //   }
  // };

  // const handleLocationChanged = useCallback(
  //   (location: string) => {
  //     try {
  //       if (bookId) debounceUpdateLastLocation(bookId, location);
  //     } catch (error) {
  //       parseError(error);
  //     }
  //   },
  //   [bookId]
  // );

  // useEffect(() => {
  //   if (!slug) return;

  //   const fetchBookUrl = async () => {
  //     try {
  //       const { data } = await client.get<BookAPIRes>(`/book/read/${slug}`);
  //       setUrl(data.url);
  //       setSettings(data.settings);
  //     } catch (error) {
  //       parseError(error);
  //     }
  //   };

  //   fetchBookUrl();
  // }, [slug]);
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
