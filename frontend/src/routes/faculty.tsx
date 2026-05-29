import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { SITE, FACULTY } from "@/lib/site-data";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: `Faculty — ${SITE.name}` },
      { name: "description", content: "Meet our experienced and qualified faculty members at GTM College of Arts & Science, Coimbatore." },
      { property: "og:url", content: "/faculty" },
    ],
    links: [{ rel: "canonical", href: "/faculty" }],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Our People"
        title="Experienced faculty dedicated to student success."
        subtitle="120+ qualified faculty members affiliated to Bharathiar University, committed to quality teaching, mentorship and academic excellence."
      />
      <Section>
        <SectionHeader title="Faculty Members" desc="Our departments are led by experienced PhD scholars and dedicated educators." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACULTY.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.04}>
              <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant transition-shadow">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-gold/10 to-primary/5 relative grid place-items-center">
                  <div className="size-20 rounded-full bg-gradient-to-br from-primary to-primary-deep grid place-items-center text-3xl font-extrabold text-gold">
                    {f.name.split(" ").slice(-1)[0][0]}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-deep mb-1">{f.dept}</div>
                  <div className="font-bold text-primary">{f.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{f.role}</div>
                  <div className="text-xs text-gold-deep mt-2 font-semibold">{f.qual}</div>
                  <div className="text-xs text-muted-foreground mt-1">Focus: {f.focus}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  ),
});
