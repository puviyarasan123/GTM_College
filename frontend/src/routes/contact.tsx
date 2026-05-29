import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${SITE.name}` },
      { name: "description", content: `Contact ${SITE.name}, Gudiyattam. Phone: 04171-220162 | Email: principal@gtmc.edu.in` },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Get in Touch" title="We would love to hear from you." subtitle="Our admissions team responds within one business day." />
      <Section>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <Reveal>
            <div className="space-y-5 mb-8">
              {[
                { i: MapPin, t: "Campus Address", v: "Govt. Thirumagal Mills College, Gudiyattam, Vellore District, Tamil Nadu – 632 602" },
                { i: Phone, t: "Phone", v: "04171-220162" },
                { i: Mail, t: "Email", v: "principal@gtmc.edu.in" },
                { i: Clock, t: "Office Hours", v: "Mon – Fri: 9:00 AM – 5:00 PM" },
              ].map((b) => (
                <div key={b.t} className="flex items-start gap-4">
                  <div className="size-11 rounded-xl bg-gold/15 text-gold-deep grid place-items-center shrink-0">
                    <b.i className="size-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{b.t}</div>
                    <div className="font-semibold text-primary mt-0.5 text-sm">{b.v}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Gudiyattam, Vellore District map */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
              <iframe
                title="GTMC Campus Location — Gudiyattam"
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.8200%2C12.9300%2C78.8800%2C12.9700&layer=mapnik&marker=12.9500%2C78.8500"
                className="size-full"
                loading="lazy"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Govt+Thirumagal+Mills+College+Gudiyattam+Vellore"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <MapPin className="size-4" /> Open in Google Maps
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              className="rounded-3xl border border-border bg-card p-8 space-y-5"
              onSubmit={(e) => { e.preventDefault(); alert("Thank you! Our team will get back to you within one business day."); }}
            >
              <h3 className="text-2xl font-bold text-primary">Send us a message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</span>
                  <input required className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your full name" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</span>
                  <input required type="email" className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="you@email.com" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</span>
                <input className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+91 XXXXX XXXXX" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course Interested In</span>
                <select className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="">Select a course</option>
                  <option>B.Sc. Mathematics</option>
                  <option>B.Sc. Physics</option>
                  <option>B.Sc. Chemistry</option>
                  <option>B.Sc. Computer Science</option>
                  <option>B.Sc. Information Technology</option>
                  <option>B.Sc. Zoology</option>
                  <option>B.Sc. Botany</option>
                  <option>B.A. Tamil</option>
                  <option>B.A. English</option>
                  <option>B.Com.</option>
                  <option>BBA</option>
                  <option>BCA</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</span>
                <textarea required rows={4} className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="How can we help you?" />
              </label>
              <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-semibold hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  ),
});
