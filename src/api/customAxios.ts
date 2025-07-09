import axios from "axios";

export const axiosWithUserAgent = axios.create({
  headers: {
    "User-Agent": "Author-books/1.0 (alessandro.foresta.dev@gmail.com)",
    Accept: "application/json",
  },
});
