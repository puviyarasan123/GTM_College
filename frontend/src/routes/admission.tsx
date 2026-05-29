import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { CheckCircle2, FileText, Calendar, CreditCard } from "lucide-react";

export const Route = createFileRoute("/admission")({
  head: () => ({
    meta: [
      { title: `Admissions 2025–26 — ${SITE.name}` },
      { name: "description", content: "Application process, eligibility, important dates and fee structure for 2025–26." },
      { property: "og:url", content: "/admission" },
    ],
    links: [{ rel: "canonical", href: "/admission" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Admissions 2025 – 26" title="Your application begins here." subtitle="A transparent four-step process. Merit-based scholarships up to 100%. Applications close 30 August 2025." />
      <Section>
        <SectionHeader eyebrow="How to apply" title="Four steps. Two weeks. One decision." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {[
            { icon: FileText, n: "01", t: "Register", d: "Create your applicant account and verify your email." },
            { icon: CheckCircle2, n: "02", t: "Eligibility", d: "Upload 10+2 marksheet and entrance scores (JEE / CET / SAT)." },
            { icon: Calendar, n: "03", t: "Interview", d: "Online interview with the programme committee within 7 days." },
            { icon: CreditCard, n: "04", t: "Confirm seat", d: "Pay first-semester fees to lock in your offer." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card p-7 h-full hover:shadow-elegant transition-shadow">
                <div className="text-5xl font-extrabold text-gold/40 leading-none mb-3">{s.n}</div>
                <s.icon className="size-6 text-primary mb-3" />
                <div className="font-bold text-primary mb-2">{s.t}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-10 text-primary-foreground">
            <div className="text-xs font-bold tracking-widest text-gold mb-3">KEY DATES</div>
            <h3 className="text-2xl font-bold mb-6">Important deadlines</h3>
            <ul className="space-y-3 text-white/85">
              <li className="flex justify-between border-b border-white/10 pb-3"><span>Applications open</span><span className="font-semibold">15 Apr 2025</span></li>
              <li className="flex justify-between border-b border-white/10 pb-3"><span>Last date to apply</span><span className="font-semibold">30 Aug 2025</span></li>
              <li className="flex justify-between border-b border-white/10 pb-3"><span>Interview window</span><span className="font-semibold">15 – 30 Sep</span></li>
              <li className="flex justify-between"><span>Session commences</span><span className="font-semibold">14 Oct 2025</span></li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-10">
            <div className="text-xs font-bold tracking-widest text-gold-deep mb-3">SCHOLARSHIPS</div>
            <h3 className="text-2xl font-bold text-primary mb-6">₹4.5 Cr in merit scholarships</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">Awarded on entrance rank, sports excellence and demonstrated need. Up to 100% tuition waiver for top-ranked candidates.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:opacity-90 transition-opacity">Talk to admissions →</Link>
          </div>
        </div>
      </Section>
    </>
  ),
});