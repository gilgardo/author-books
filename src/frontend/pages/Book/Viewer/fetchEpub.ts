import axios from "axios";

export const fetchEpub = async (ocaid: string) => {
  const res = await axios.get(`/book/epub/${ocaid}`, {
    responseType: "blob",
    headers: { Accept: "application/epub+zip" },
  });

  const blob = new Blob([res.data], { type: "application/epub+zip" });
  return URL.createObjectURL(blob) as string;
};
