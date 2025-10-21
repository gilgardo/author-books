import { BASE_URL } from "@/data";
import axios from "axios";

export const fetchEpub = async (ocaid: string) => {
  const res = await axios.get(`${BASE_URL}/book/epub/${ocaid}.epub`, {
    responseType: "blob",
    headers: { Accept: "application/epub+zip" },
  });

  const blob: Blob = res.data;

  return blob;
};
