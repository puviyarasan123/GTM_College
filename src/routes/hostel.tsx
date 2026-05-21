import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { BedDouble, UtensilsCrossed, Shield, Wifi } from "lucide-react";

export const Route = createFileRoute("/hostel")({
  head: () => ({
    meta: [
      { title: `Hostel & Residential Life — ${SITE.name}` },
      { name: "description", content: "Six residential halls, 24/7 mess, gym, common rooms and round-the-clock security." },
      { property: "og:url", content: "/hostel" },
    ],
    links: [{ rel: "canonical", href: "/hostel" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Residential life" title="Six halls. One community." subtitle="A residential experience designed for focus, friendship and the kind of late-night conversations that change directions." />
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: BedDouble, t: "5,400 beds", d: "Single and twin-share rooms across six residential halls." },
            { i: UtensilsCrossed, t: "Multi-cuisine mess", d: "Nutritionist-designed menus, breakfast to late-night." },
            { i: Shield, t: "24/7 security", d: "CCTV, biometric entry and resident wardens on every floor." },
            { i: Wifi, t: "Gigabit Wi-Fi", d: "Campus-wide high-speed internet in every room." },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6 h-full hover:shadow-elegant transition-shadow">
                <b.i className="size-7 text-gold-deep mb-4" />
                <div className="font-bold text-primary">{b.t}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  ),
});