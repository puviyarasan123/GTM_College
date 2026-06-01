import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { getSiteImages } from "@/lib/content-fns";
import type { SiteImages } from "@/lib/content-fns";
import campus from "@/assets/about-campus.jpg";
import lab from "@/assets/hero-lab.jpg";
import lib from "@/assets/hero-library.jpg";
import hero from "@/assets/hero-campus.jpg";

const FALLBACK = [
  { src: hero, caption: "Convocation 2024" },
  { src: campus, caption: "Academic block at dusk" },
  { src: lab, caption: "Robotics laboratory" },
  { src: lib, caption: "Central library reading hall" },
  { src: hero, caption: "Annual cultural festival" },
  { src: campus, caption: "Spring on the quadrangle" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Campus Gallery — ${SITE.name}` },
      { name: "description", content: "Moments from our campus, classrooms, labs and festivals." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  loader: async (): Promise<SiteImages> => {
    try { return await getSiteImages(); } catch { return {}; }
  },
  component: GalleryPage,
});

function GalleryPage() {
  const images = Route.useLoaderData() as SiteImages;
  const items =
    images.gallery && images.gallery.length > 0
      ? images.gallery.map((g) => ({ src: g.url, caption: g.caption }))
      : FALLBACK;

  return (
    <>
      <PageHero eyebrow="Gallery" title="The campus, in moments." />
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((im, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <figure className="group relative overflow-hidden rounded-2xl bg-muted">
                <img src={im.src} alt={im.caption} className="aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-deep/90 to-transparent p-5 text-primary-foreground text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{im.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
