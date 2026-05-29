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
  { icon: Award, title: "NAAC 'A' Grade Accredited", desc: "Recognised for academic quality, infrastructure and student outcomes." },
  { icon: BookOpen, title: "Quality Education", desc: "Curriculum aligned with Bharathiar University standards and industry needs." },
  { icon: Globe2, title: "Holistic Development", desc: "Sports, cultural activities, NSS and NCC programmes for all-round growth." },
  { icon: Sparkles, title: "Student-Centred", desc: "Mentorship, career guidance and placement support from day one." },
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About the institution" title={`Three decades of empowering minds at ${SITE.short}.`} subtitle={`Established in ${SITE.estd}, GTM College of Arts & Science has grown into a premier institution in Coimbatore, offering quality education in Science, Arts, Commerce and Management, affiliated to Bharathiar University.`} />
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <SectionHeader eyebrow="Our story" title="A legacy built on knowledge, values and excellence." desc="Founded with a vision to provide quality higher education, GTM College has grown from a small institution into a thriving campus serving 8,000+ students. Every classroom, lab and library is designed to nurture curiosity and build careers." />
            <p className="text-muted-foreground leading-relaxed">Our teaching approach blends strong academic foundations with practical learning. Students graduate with skills, confidence and values that make them successful in their careers and life. Industry-aligned curriculum ensures graduates are job-ready from day one.</p>
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