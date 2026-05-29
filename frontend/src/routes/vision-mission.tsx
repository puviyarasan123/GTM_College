import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { Target, Compass, Heart } from "lucide-react";

export const Route = createFileRoute("/vision-mission")({
  head: () => ({
    meta: [
      { title: `Vision & Mission — ${SITE.name}` },
      { name: "description", content: "Our vision, mission and core values." },
      { property: "og:url", content: "/vision-mission" },
    ],
    links: [{ rel: "canonical", href: "/vision-mission" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Vision · Mission · Values" title="A north star for everything we build, teach and become." />
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Vision", body: "To be a premier Arts & Science institution in Tamil Nadu, recognised for academic excellence, holistic student development and meaningful contribution to society." },
            { icon: Compass, title: "Mission", body: "To provide quality education through experienced faculty, modern infrastructure and student-centred learning that prepares graduates for successful careers and responsible citizenship." },
            { icon: Heart, title: "Values", body: "Integrity in all actions. Excellence in academics. Respect for every individual. Service to society. These values define who we are and how we grow together." },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="rounded-3xl bg-gradient-to-b from-primary to-primary-deep text-primary-foreground p-8 h-full shadow-elegant">
                <div className="size-12 rounded-xl bg-gold/20 text-gold grid place-items-center mb-6"><b.icon className="size-6" /></div>
                <h3 className="text-2xl font-bold mb-3">{b.title}</h3>
                <p className="text-white/80 leading-relaxed">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  ),
});