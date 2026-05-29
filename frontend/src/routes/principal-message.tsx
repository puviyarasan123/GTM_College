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
      <PageHero eyebrow="From the principal's office" title="We nurture students to become confident, capable and compassionate individuals." subtitle="Dr. S. Meenakshi, Principal" />
      <Section>
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
          <Reveal>
            <Quote className="size-10 text-gold mb-6" />
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>At GTM College of Arts & Science, we believe that education is not just about acquiring knowledge — it is about developing the whole person. Our goal is to create graduates who are not only academically strong but also ethically grounded and socially responsible.</p>
              <p>Our faculty are dedicated mentors who go beyond the classroom to guide students in their academic and personal growth. Our curriculum is designed to build critical thinking, communication skills and practical knowledge that employers value.</p>
              <p>We take pride in our vibrant campus life — from cultural festivals and sports events to NSS activities and industry visits — all of which contribute to the holistic development of our students.</p>
              <p>To every student joining us: you are in the right place. Work hard, stay curious, and we will walk this journey with you.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-gold to-gold-deep shadow-elegant" />
            <div className="mt-6">
              <div className="font-bold text-primary text-lg">Dr. S. Meenakshi</div>
              <div className="text-sm text-muted-foreground">Principal, Ph.D. (Bharathiar University)</div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  ),
});