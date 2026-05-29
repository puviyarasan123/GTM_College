import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";

const FACULTY = [
  { name: "Dr. Aishwarya Krishnan", role: "Principal · Computer Science", credentials: "Ph.D., Stanford" },
  { name: "Dr. Vikram Pillai", role: "Dean — Engineering", credentials: "Ph.D., IIT Madras" },
  { name: "Dr. Meera Subramanian", role: "Head, AI & Data Science", credentials: "Ph.D., MIT" },
  { name: "Dr. Rohan Banerjee", role: "Professor, ECE", credentials: "Ph.D., Cambridge" },
  { name: "Dr. Priya Iyengar", role: "Head, Biotechnology", credentials: "Ph.D., Johns Hopkins" },
  { name: "Dr. Arvind Rao", role: "Professor, Mechanical", credentials: "Ph.D., TU Munich" },
  { name: "Dr. Lakshmi Narayan", role: "Head, Civil Engineering", credentials: "Ph.D., IIT Bombay" },
  { name: "Dr. Sanjay Mehta", role: "Professor, EEE", credentials: "Ph.D., Berkeley" },
];

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: `Faculty — ${SITE.name}` },
      { name: "description", content: "Meet the 250+ PhD scholars and industry experts shaping our classrooms." },
      { property: "og:url", content: "/faculty" },
    ],
    links: [{ rel: "canonical", href: "/faculty" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="People" title="Faculty who publish, build and teach in equal measure." subtitle="250+ PhDs. 40+ visiting industry chairs. A 1:14 faculty-to-student ratio." />
      <Section>
        <SectionHeader title="Distinguished faculty" desc="A small sample of the educators who anchor our classrooms and labs." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACULTY.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.04}>
              <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant transition-shadow">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/15 via-gold/10 to-primary/5 relative">
                  <div className="absolute inset-0 grid place-items-center text-5xl font-extrabold text-primary/20">{f.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}</div>
                </div>
                <div className="p-5">
                  <div className="font-bold text-primary">{f.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{f.role}</div>
                  <div className="text-xs text-gold-deep mt-2 font-semibold">{f.credentials}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  ),
});