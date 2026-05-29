import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "path";

export default defineConfig({
  root: "frontend",
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    TanStackRouterVite({
      routesDirectory: "./frontend/src/routes",
      generatedRouteTree: "./frontend/src/routeTree.gen.ts",
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
    port: 8080,
  },
});
