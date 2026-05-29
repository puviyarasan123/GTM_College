import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/chairman-message")({
  head: () => ({
    meta: [
      { title: `Chairman's Message — ${SITE.name}` },
      { name: "description", content: "A note from the chairman on values, vision and the road ahead." },
      { property: "og:url", content: "/chairman-message" },
    ],
    links: [{ rel: "canonical", href: "/chairman-message" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="From the chairman's desk" title="Education is the foundation of every great society." subtitle="Thiru. G. T. Muthukumar, Chairman & Founder" />
      <Section>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <Reveal>
            <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-primary to-primary-deep shadow-elegant" />
            <div className="mt-6">
              <div className="font-bold text-primary text-lg">Thiru. G. T. Muthukumar</div>
              <div className="text-sm text-muted-foreground">Chairman & Founder</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Quote className="size-10 text-gold mb-6" />
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-5">
              <p>When we founded this institution in {SITE.estd}, our vision was clear: to provide quality higher education that transforms lives and builds a better society. Three decades later, that vision continues to guide every decision we make.</p>
              <p>We have built a campus where every student is valued, where teachers are mentors, and where learning goes beyond textbooks. Our students come from diverse backgrounds and leave as confident, capable individuals ready to contribute to society.</p>
              <p>GTM College of Arts & Science stands as a testament to the belief that quality education should be accessible to all. We remain committed to nurturing talent, building character and creating opportunities for every student who walks through our doors.</p>
              <p>I warmly invite you to be part of the GTM family.</p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  ),
});