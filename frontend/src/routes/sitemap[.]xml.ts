import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({
  beforeLoad: () => {
    throw redirect({ href: "/api/sitemap.xml" });
  },
});
