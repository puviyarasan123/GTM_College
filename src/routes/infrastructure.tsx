import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import campus from "@/assets/about-campus.jpg";
import lab from "@/assets/hero-lab.jpg";
import lib from "@/assets/hero-library.jpg";

export const Route = createFileRoute("/infrastructure")({
  head: () => ({
    meta: [
      { title: `Infrastructure — ${SITE.name}` },
      { name: "description", content: "120-acre campus, 40+ labs, smart classrooms, sports complex and innovation studios." },
      { property: "og:url", content: "/infrastructure" },
    ],
    links: [{ rel: "canonical", href: "/infrastructure" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="The campus" title="120 acres. Designed for deep work." subtitle="Smart classrooms, an FDA-grade biotech wing, a 25,000 sq.ft maker-space, and a sports complex with Olympic-spec facilities." />
      <Section>
        <SectionHeader title="Spaces built for the kind of learning we believe in" />
        <div className="grid lg:grid-cols-3 gap-5">
          {[
            { img: campus, t: "Academic quadrangle", d: "Naturally-lit lecture halls, breakout pods and quiet courtyards." },
            { img: lab, t: "Research laboratories", d: "40+ labs across electronics, biotech, materials and AI." },
            { img: lib, t: "Library & reading commons", d: "24/7 access, individual carrels and silent zones." },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06}>
              <div className="rounded-3xl overflow-hidden border border-border bg-card group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.t} className="size-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{s.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  ),
});