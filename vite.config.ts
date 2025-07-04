import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy:
      mode === "development"
        ? {
            "/api": {
              target: "http://localhost:3000",
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
  },
}));
