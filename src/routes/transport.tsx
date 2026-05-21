import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { Bus } from "lucide-react";

const ROUTES = [
  "Adyar · Velachery · Tambaram",
  "T. Nagar · Saidapet · Guindy",
  "Anna Nagar · Vadapalani · Porur",
  "OMR — Sholinganallur to Siruseri",
  "GST Road — Chrompet to Chengalpattu",
  "Avadi · Ambattur · Pattabiram",
];

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: `Transport — ${SITE.name}` },
      { name: "description", content: "60+ daily routes across Chennai. GPS-tracked, AC fleet." },
      { property: "og:url", content: "/transport" },
    ],
    links: [{ rel: "canonical", href: "/transport" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Getting here" title="60+ routes. A campus that is easy to reach." subtitle="GPS-tracked, AC, female-attendant escorted buses across every major Chennai corridor." />
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROUTES.map((r, i) => (
            <Reveal key={r} delay={i * 0.04}>
              <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4 hover:shadow-elegant transition-shadow">
                <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0"><Bus className="size-5" /></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-deep mb-1">Route {String(i + 1).padStart(2, "0")}</div>
                  <div className="font-semibold text-primary leading-snug">{r}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  ),
});