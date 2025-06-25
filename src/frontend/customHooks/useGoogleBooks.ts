// useGoogleBooks.ts
import { useEffect, useState } from "react";

export const useGoogleBooks = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.google?.books) {
      setReady(true);
      window.google.books.load();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.google.com/books/jsapi.js";
    script.onload = () => {
      window.google?.books?.load?.();
      setReady(true);
    };
    script.onerror = () => {
      console.error("Failed to load Google Books API.");
    };
    document.body.appendChild(script);
  }, []);

  return ready;
};
