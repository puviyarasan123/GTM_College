import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { CheckCircle2, FileText, Calendar, CreditCard } from "lucide-react";

export const Route = createFileRoute("/admission")({
  component: () => (
    <>
      <PageHero
        eyebrow="Admissions 2025–26"
        title="Your journey to excellence begins here."
        subtitle="A simple and transparent admission process for all UG programmes. Applications open for 2025–26 academic year."
      />
      <Section>
        <SectionHeader eyebrow="How to Apply" title="Four simple steps to join GTMC." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {[
            { icon: FileText, n: "01", t: "Register Online", d: "Create your student account and fill the application form with your personal and academic details." },
            { icon: CheckCircle2, n: "02", t: "Submit Documents", d: "Upload your 10+2 marksheet, transfer certificate, community certificate and passport photo." },
            { icon: Calendar, n: "03", t: "Verification", d: "Document verification and counselling at the college within 7 working days of submission." },
            { icon: CreditCard, n: "04", t: "Confirm Seat", d: "Pay the admission fees at the college office to confirm your seat and attend orientation." },
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
            <div className="text-xs font-bold tracking-widest text-gold mb-3">KEY DATES — 2025–26</div>
            <h3 className="text-2xl font-bold mb-6">Important deadlines</h3>
            <ul className="space-y-3 text-white/85">
              <li className="flex justify-between border-b border-white/10 pb-3"><span>Applications open</span><span className="font-semibold">Apr 2025</span></li>
              <li className="flex justify-between border-b border-white/10 pb-3"><span>Last date to apply</span><span className="font-semibold">Aug 30, 2025</span></li>
              <li className="flex justify-between border-b border-white/10 pb-3"><span>Document verification</span><span className="font-semibold">Sep 2025</span></li>
              <li className="flex justify-between"><span>Classes commence</span><span className="font-semibold">Oct 2025</span></li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-10">
            <div className="text-xs font-bold tracking-widest text-gold-deep mb-3">ELIGIBILITY</div>
            <h3 className="text-2xl font-bold text-primary mb-4">Who can apply?</h3>
            <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Passed 10+2 or equivalent from a recognised board</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Minimum 50% aggregate marks (45% for SC/ST candidates)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Relevant subject combination as per programme requirements</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Tamil Nadu state board / CBSE / ICSE all accepted</li>
            </ul>
            <Link to="/apply" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:opacity-90 transition-opacity">
              Apply Now →
            </Link>
          </div>
        </div>
      </Section>
    </>
  ),
});
