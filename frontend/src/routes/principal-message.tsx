import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/principal-message")({
  head: () => ({
    meta: [
      { title: `Principal's Message — ${SITE.name}` },
      { name: "description", content: "A note from the principal on academic culture and student success." },
      { property: "og:url", content: "/principal-message" },
    ],
    links: [{ rel: "canonical", href: "/principal-message" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="From the principal's office" title="We do not prepare students for jobs. We prepare them to invent them." subtitle="Dr. Aishwarya Krishnan, Principal" />
      <Section>
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
          <Reveal>
            <Quote className="size-10 text-gold mb-6" />
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>The world our students will work in does not yet exist. Roles will be redefined, industries will be reshuffled, and entire categories of work will emerge that we cannot name today. Our role, then, is not to teach the present but to build the people who will design the future.</p>
              <p>That is why our curriculum is anchored in first principles — mathematics, systems thinking, design, ethics — and why every student completes a year-long capstone before graduating. It is why our labs stay open at midnight and why our faculty publish, build and teach in equal measure.</p>
              <p>To every prospective student reading this: bring your questions. We will help you sharpen them.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-gold to-gold-deep shadow-elegant" />
            <div className="mt-6">
              <div className="font-bold text-primary text-lg">Dr. Aishwarya Krishnan</div>
              <div className="text-sm text-muted-foreground">Principal, Ph.D. (Stanford)</div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  ),
});