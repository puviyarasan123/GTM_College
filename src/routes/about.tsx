import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { SITE, STATS } from "@/lib/site-data";
import { Award, BookOpen, Globe2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${SITE.name}` },
      { name: "description", content: `Discover the legacy, vision and accreditations of ${SITE.name}.` },
      { property: "og:title", content: `About — ${SITE.name}` },
      { property: "og:description", content: `Three decades of academic excellence, research and impact.` },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const pillars = [
  { icon: Award, title: "NAAC A++ Accredited", desc: "Reaffirmed for academic rigour and institutional excellence." },
  { icon: BookOpen, title: "Research-Led Teaching", desc: "₹120 Cr+ in active research grants across eight schools." },
  { icon: Globe2, title: "Global Partnerships", desc: "Exchange programmes across 32 universities in 18 countries." },
  { icon: Sparkles, title: "Innovation DNA", desc: "On-campus incubator with 60+ student-led ventures funded." },
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About the institution" title={`Three decades of engineering the future at ${SITE.short}.`} subtitle={`Established in ${SITE.estd}, we have grown into a premier multi-disciplinary university shaping leaders across engineering, science, design and management.`} />
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <SectionHeader eyebrow="Our story" title="A legacy built on curiosity, rigour and craft." desc="Founded by a collective of educators and industry leaders, the institute has grown from a single engineering school into a 120-acre campus serving 15,000+ learners. Every classroom, lab and studio is designed to turn questions into outcomes." />
            <p className="text-muted-foreground leading-relaxed">Our pedagogy blends classical fundamentals with project-led learning. Students graduate with portfolios, patents and publications — not just transcripts. Industry advisory boards refresh every programme on a 24-month cycle so what is taught here matches what is shipped outside.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-6 h-full hover:shadow-elegant transition-shadow">
                  <div className="size-11 rounded-xl bg-gold/15 text-gold-deep grid place-items-center mb-4"><p.icon className="size-5" /></div>
                  <div className="font-bold text-primary">{p.title}</div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-extrabold text-gold">{s.value.toLocaleString()}{s.suffix}</div>
              <div className="text-sm text-white/70 mt-2 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}