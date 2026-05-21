import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { Calendar, MapPin } from "lucide-react";

const EVENTS = [
  { date: "14 – 16 Sep", title: "Global Research Summit 2026", venue: "Convention Hall", desc: "Three days of keynotes, panels and demos across AI, biotech and sustainability." },
  { date: "02 – 04 Oct", title: "TechNova — Annual Technical Festival", venue: "Innovation Block", desc: "60+ events, 4,000+ participants, ₹15 L in prizes." },
  { date: "11 Nov", title: "Industry Connect Conclave", venue: "Auditorium", desc: "CTOs and founders from 40 companies discuss the hiring landscape." },
  { date: "20 – 22 Jan", title: "Spectrum — Cultural Festival", venue: "Open Air Theatre", desc: "The flagship cultural fest with music, dance, theatre and street art." },
];

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: `Events — ${SITE.name}` },
      { name: "description", content: "Symposiums, conferences and student festivals across the academic year." },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Calendar" title="Upcoming events on campus." />
      <Section>
        <div className="grid md:grid-cols-2 gap-5">
          {EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-7 h-full hover:shadow-elegant transition-shadow">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gold-deep mb-4"><Calendar className="size-3.5" /> {e.date}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{e.title}</h3>
                <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-3"><MapPin className="size-3.5" /> {e.venue}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  ),
});