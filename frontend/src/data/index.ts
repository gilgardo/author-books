// In development: use relative path "/api" (handled by Vite proxy)
// In production: use full URL from VITE_API_URL env variable
export const BASE_URL: string =
  import.meta.env.MODE === "development"
    ? "/api"
    : (import.meta.env.VITE_API_URL || "") + "/api";
