import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    TanStackRouterVite({ routesDirectory: "./src/routes", generatedRouteTree: "./src/routeTree.gen.ts" }),
    viteReact(),
  ],
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
  },
  server: {
    host: "::",
    port: 8080,
  },
});
