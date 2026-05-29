import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { RECRUITERS, SITE } from "@/lib/site-data";

const HIGHLIGHTS = [
  { k: "92%", v: "Placement rate, batch 2024" },
  { k: "₹12 LPA", v: "Highest package offered" },
  { k: "₹4.2 LPA", v: "Average CTC" },
  { k: "180+", v: "Recruiting partners" },
];

const OFFERS = [
  { co: "TCS", role: "Systems Engineer", ctc: "₹7.5 LPA" },
  { co: "Infosys", role: "Software Engineer", ctc: "₹6.5 LPA" },
  { co: "Wipro", role: "Project Engineer", ctc: "₹6 LPA" },
  { co: "ICICI Bank", role: "Relationship Manager", ctc: "₹8 LPA" },
  { co: "Cognizant", role: "Programmer Analyst", ctc: "₹7 LPA" },
  { co: "Zoho", role: "Software Developer", ctc: "₹12 LPA" },
];

export const Route = createFileRoute("/placement")({
  head: () => ({
    meta: [
      { title: `Placements — ${SITE.name}` },
      { name: "description", content: "98% placements, ₹54 LPA highest, 450+ recruiters." },
      { property: "og:url", content: "/placement" },
    ],
    links: [{ rel: "canonical", href: "/placement" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Career outcomes" title="Where our graduates go next." subtitle="A dedicated placement cell with year-round recruitment drives and strong industry connections across IT, banking, management and more." />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {HIGHLIGHTS.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.05}>
              <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-deep text-primary-foreground p-7">
                <div className="text-4xl font-extrabold text-gold">{s.k}</div>
                <div className="text-sm text-white/75 mt-2 uppercase tracking-wider">{s.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <SectionHeader eyebrow="Top offers — batch 2024" title="Highlight offers from this year's placement season" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {OFFERS.map((o, i) => (
            <Reveal key={o.co} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-primary text-lg">{o.co}</span>
                  <span className="text-gold-deep font-extrabold">{o.ctc}</span>
                </div>
                <div className="text-sm text-muted-foreground">{o.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <SectionHeader eyebrow="Our recruiters" title="180+ companies. Every sector." />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {RECRUITERS.map((r) => (
            <div key={r} className="rounded-xl border border-border bg-card px-4 py-5 text-center font-semibold text-primary">{r}</div>
          ))}
        </div>
      </Section>
    </>
  ),
});