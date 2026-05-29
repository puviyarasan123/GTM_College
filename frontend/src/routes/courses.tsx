import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { COURSES, SITE } from "@/lib/site-data";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: `Courses Offered — ${SITE.name}` },
      { name: "description", content: "Explore UG, PG and doctoral programmes across engineering, science and management." },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Academics" title="Programmes engineered for the next decade of work." subtitle="From four-year undergraduate degrees to doctoral research — every curriculum is reviewed every 24 months with industry advisory boards." />
      <Section>
        <SectionHeader eyebrow="All programmes" title="Choose your trajectory" desc="14 programmes. 26 specialisations. One commitment to depth." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="group relative rounded-2xl border border-border bg-card p-7 h-full hover:border-primary/30 hover:shadow-elegant transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="size-11 rounded-xl bg-primary/10 text-primary grid place-items-center"><GraduationCap className="size-5" /></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-deep">{c.level}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{c.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {c.branches.map((b) => (
                    <span key={b} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{b}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                  <span className="text-muted-foreground">{c.duration} · {c.seats} seats</span>
                  <Link to="/admission" className="text-primary font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">Apply <ArrowRight className="size-3.5" /></Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  ),
});