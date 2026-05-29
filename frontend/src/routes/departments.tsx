import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { DEPARTMENTS, SITE } from "@/lib/site-data";
import * as Icons from "lucide-react";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: `Departments — ${SITE.name}` },
      { name: "description", content: "Eight schools spanning engineering, computing and applied sciences." },
      { property: "og:url", content: "/departments" },
    ],
    links: [{ rel: "canonical", href: "/departments" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Schools & Departments" title="Ten departments. One culture of excellence." subtitle="Each department is dedicated to quality teaching, student mentorship and academic growth across Science, Arts, Commerce and Management." />
      <Section>
        <SectionHeader title="Explore the schools" desc="Click through to learn about programmes, faculty and research focus areas." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEPARTMENTS.map((d, i) => {
            const Icon = (Icons as any)[d.icon] ?? Icons.Atom;
            return (
              <Reveal key={d.code} delay={i * 0.04}>
                <div className="group relative rounded-2xl border border-border bg-card p-6 h-full overflow-hidden hover:border-primary/30 transition-all hover:shadow-elegant">
                  <div className="absolute -top-12 -right-12 size-32 rounded-full bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-primary-deep text-primary-foreground grid place-items-center mb-5"><Icon className="size-5" /></div>
                  <div className="text-[10px] font-bold tracking-widest text-gold-deep mb-1">{d.code}</div>
                  <h3 className="font-bold text-primary leading-snug">{d.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  ),
});