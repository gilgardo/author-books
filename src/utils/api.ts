import axios from "axios";
import { BASE_URL } from "../data";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  console.log("[Interceptor] Running for", config.method, config.url);
  const isModifying = ["post", "put", "patch", "delete"].includes(
    config.method || ""
  );

  if (isModifying) {
    console.log("Fetching CSRF token...");
    try {
      const { data } = await axios.get(`${BASE_URL}/csrf-token`, {
        withCredentials: true,
      });
      config.headers["X-CSRF-Token"] = data.csrfToken;
    } catch (err) {
      console.error("Failed to fetch CSRF token", err);
    }
  }

  return config;
});
export default api;
