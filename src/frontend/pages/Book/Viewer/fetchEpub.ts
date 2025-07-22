import { BASE_URL } from "@/data";
import axios from "axios";

export const fetchEpub = async (ocaid: string) => {
  const res = await axios.get(`${BASE_URL}/book/epub/${ocaid}`, {
    responseType: "blob",
    headers: { Accept: "application/epub+zip" },
  });

  const blob = new Blob([res.data], { type: "application/epub+zip" });
  console.log(blob);
  return URL.createObjectURL(blob) as string;
};
