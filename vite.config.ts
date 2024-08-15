import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ManifestV3Export, crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import path from "path";

const createManifest = (): ManifestV3Export => {
  return {
    ...manifest,
    background: {
      ...manifest.background,
      type: "module",
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest: createManifest() })],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/shadcn"),
      app: path.resolve(__dirname, "./src"),
    },
  },
});

/**
 * If you want to use http instead of websockets, you might need this:
 * 
 * export default defineConfig({
  plugins: [react(), crx({ manifest: createManifest() })],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
      protocol: "http",
      host: "localhost",
    },
    host: "localhost",
  },
});
 */
