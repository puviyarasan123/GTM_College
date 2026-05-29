import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { SITE, STATS } from "@/lib/site-data";
import { Award, BookOpen, Globe2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${SITE.name}` },
      { name: "description", content: `Learn about ${SITE.name}, Gudiyattam — affiliated to Thiruvalluvar University, offering quality UG programmes since ${SITE.estd}.` },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const pillars = [
  { icon: Award, title: "NAAC Accredited", desc: "Recognised for academic quality, infrastructure and student outcomes." },
  { icon: BookOpen, title: "Thiruvalluvar University Affiliated", desc: "All programmes affiliated to Thiruvalluvar University, Vellore." },
  { icon: Globe2, title: "Holistic Development", desc: "Sports, cultural activities, NSS and NCC programmes for all-round growth." },
  { icon: Sparkles, title: "Government College", desc: "A government-aided institution serving students of Gudiyattam and Vellore District since 1974." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Institution"
        title="Five decades of empowering minds at GTMC."
        subtitle={`Established in ${SITE.estd}, Govt. Thirumagal Mills College, Gudiyattam has grown into a trusted institution in Vellore District, offering quality education in Science, Arts, Commerce and Management, affiliated to Thiruvalluvar University.`}
      />
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <SectionHeader
              eyebrow="Our Story"
              title="A legacy built on knowledge, values and service."
              desc={`Founded in ${SITE.estd} under the Government of Tamil Nadu, GTMC has been serving students from Gudiyattam and surrounding areas of Vellore District for over 50 years. The college is named after the Thirumagal Mills, reflecting its deep roots in the local community. Every classroom, lab and library is designed to nurture curiosity and build careers.`}
            />
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our teaching approach blends strong academic foundations with practical learning. Students graduate with skills, confidence and values that make them successful in their careers and life. As a government college, we are committed to making quality higher education accessible to all sections of society.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-6 h-full hover:shadow-elegant transition-shadow">
                  <div className="size-11 rounded-xl bg-gold/15 text-gold-deep grid place-items-center mb-4">
                    <p.icon className="size-5" />
                  </div>
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
