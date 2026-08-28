import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "path";
import type { ServerResponse } from "http";

export default defineConfig({
  root: "frontend",
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    viteReact(),
  ],
  resolve: {
    alias: { "@": resolve(__dirname, "frontend/src") },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    host: "::",
    port: Number(process.env.VITE_PORT ?? 8080),
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.API_PORT ?? 3001}`,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("error", (err, _req, res) => {
            console.error("[proxy error]", err.message);
            const sres = res as ServerResponse;
            if (!sres.headersSent) {
              sres.writeHead(502, { "Content-Type": "application/json" });
              sres.end(JSON.stringify({ message: "API server unavailable" }));
            }
          });
        },
      },
    },
  },
});
