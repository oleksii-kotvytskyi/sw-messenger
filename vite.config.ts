import { defineConfig } from "vite";
// import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import { buildSync } from "esbuild";
import { join } from "node:path";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/sw-messenger",
  plugins: [
    react(),
    {
      apply: "build",
      enforce: "post",
      transformIndexHtml() {
        buildSync({
          minify: true,
          bundle: true,
          entryPoints: [join(process.cwd(), "public", "worker.ts")],
          outfile: join(process.cwd(), "dist", "worker.ts"),
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
