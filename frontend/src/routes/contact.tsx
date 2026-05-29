import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { MapPin, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${SITE.name}` },
      { name: "description", content: "Reach the admissions, registrar and student services teams." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Get in touch" title="We would love to hear from you." subtitle="Our admissions team responds within one business day." />
      <Section>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <Reveal>
            <div className="space-y-6 mb-10">
              {[
                { i: MapPin, t: "Campus", v: SITE.address },
                { i: Phone, t: "Phone", v: SITE.phone },
                { i: Mail, t: "Email", v: SITE.email },
              ].map((b) => (
                <div key={b.t} className="flex items-start gap-4">
                  <div className="size-11 rounded-xl bg-gold/15 text-gold-deep grid place-items-center shrink-0"><b.i className="size-5" /></div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{b.t}</div>
                    <div className="font-semibold text-primary mt-0.5">{b.v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
              <iframe title="Campus location" src="https://www.openstreetmap.org/export/embed.html?bbox=80.20%2C12.95%2C80.30%2C13.05&layer=mapnik" className="size-full" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form className="rounded-3xl border border-border bg-card p-8 space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Thanks — our team will be in touch."); }}>
              <h3 className="text-2xl font-bold text-primary">Send us a message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full name</span>
                  <input required className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</span>
                  <input required type="email" className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</span>
                <input className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</span>
                <textarea required rows={5} className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </label>
              <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-semibold hover:opacity-90 transition-opacity">Send message</button>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  ),
});