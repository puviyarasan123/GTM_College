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
      <PageHero eyebrow="From the chairman's desk" title="Education is the most enduring investment a society can make." subtitle="Dr. Rajaram Venkatesh, Chairman & Founder" />
      <Section>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <Reveal>
            <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-primary to-primary-deep shadow-elegant" />
            <div className="mt-6">
              <div className="font-bold text-primary text-lg">Dr. Rajaram Venkatesh</div>
              <div className="text-sm text-muted-foreground">Chairman & Founder</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Quote className="size-10 text-gold mb-6" />
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-5">
              <p>When we founded this institution in {SITE.estd}, the question we asked ourselves was simple: what kind of learners does the world need next? Three decades later that question still shapes every decision we make.</p>
              <p>We have built a campus where curiosity is not a luxury but a requirement. Where students from every corner of the country sit beside each other and discover that engineering is, at its heart, an act of service. Where faculty are not gatekeepers of knowledge but companions on the path of discovery.</p>
              <p>The pages that follow describe our programmes, our labs, our partnerships and our results. But the real measure of this institution is the kind of human being who walks out of our gates — thoughtful, capable, grounded, and ready to lead.</p>
              <p>I invite you to join us on this journey.</p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  ),
});