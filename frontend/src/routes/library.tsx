import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { BookOpen, Database, Wifi, Clock } from "lucide-react";
import libImg from "@/assets/hero-library.jpg";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: `Library & Knowledge Centre — ${SITE.name}` },
      { name: "description", content: "1.2 lakh volumes, 40+ digital databases, open 24/7." },
      { property: "og:url", content: "/library" },
    ],
    links: [{ rel: "canonical", href: "/library" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Knowledge Centre" title="A library that never closes." subtitle="120,000 print volumes, 40+ research databases, silent zones, group studios and a 24/7 reading commons." />
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant">
              <img src={libImg} alt="Central library reading hall" className="size-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeader eyebrow="The collection" title="Where research begins" />
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: BookOpen, k: "1,20,000+", v: "Print volumes" },
                { icon: Database, k: "40+", v: "Digital databases" },
                { icon: Wifi, k: "Gigabit", v: "Campus-wide Wi-Fi" },
                { icon: Clock, k: "24 / 7", v: "Reading commons" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border p-5">
                  <s.icon className="size-5 text-gold-deep mb-3" />
                  <div className="text-2xl font-extrabold text-primary">{s.k}</div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  ),
});