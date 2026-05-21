import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";

const NEWS = [
  { date: "12 May 2026", tag: "Accreditation", title: "NAAC A++ re-accreditation conferred for a further five years", excerpt: "An independent panel rated the institution outstanding across teaching, research and governance." },
  { date: "28 Apr 2026", tag: "Research", title: "₹12 Cr DST grant awarded for next-generation battery research", excerpt: "A multi-disciplinary team across EEE, Chemistry and Materials will lead the four-year programme." },
  { date: "10 Apr 2026", tag: "Placements", title: "Batch 2026 placements cross 98% with record ₹54 LPA highest offer", excerpt: "450+ companies participated in the year-long recruitment drive." },
  { date: "02 Apr 2026", tag: "Campus", title: "New 25,000 sq.ft maker-space inaugurated at the innovation block", excerpt: "Equipped with CNC, 3D printing, electronics prototyping and a wet lab." },
];

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: `News & Announcements — ${SITE.name}` },
      { name: "description", content: "Latest news, accreditations, research milestones and campus updates." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Newsroom" title="What is happening on campus." />
      <Section>
        <div className="space-y-5">
          {NEWS.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.05}>
              <article className="grid md:grid-cols-[180px_1fr] gap-6 rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition-shadow">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-deep">{n.tag}</div>
                  <div className="text-sm text-muted-foreground mt-1">{n.date}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary leading-snug">{n.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{n.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  ),
});