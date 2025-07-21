import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ReactReader } from "react-reader";
import { useEpubGet } from "./useEpubGet";
import { BASE_URL } from "@/data";

const Viewer = () => {
  const [searchParams] = useSearchParams();
  const ocaid = searchParams.get("ocaid") || "";
  // const { data: url, isPending } = useEpubGet(ocaid);
  const [location, setLocation] = useState<string | number>(0);
  const url = `${BASE_URL}/book/epub/${ocaid}.epub`;

  // if (isPending) return <div>...</div>;
  // if (!url) return <div>Error</div>;
  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        url={url}
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        epubInitOptions={{
          openAs: "epub",
        }}
      />
    </div>
  );
};

export default Viewer;
