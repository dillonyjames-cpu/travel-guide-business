import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `--mode singlefile` inlines all JS/CSS into one HTML file for private previews.
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === "singlefile" ? [viteSingleFile()] : [])],
  build: { outDir: mode === "singlefile" ? "dist-preview" : "dist" },
}));
