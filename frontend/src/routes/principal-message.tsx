import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE, PRINCIPAL as STATIC_PRINCIPAL } from "@/lib/site-data";
import { getPrincipal } from "@/lib/content-fns";
import type { PrincipalData } from "@/lib/content-fns";
import { Quote } from "lucide-react";

const DEFAULT_MESSAGE = [
  "The Principal extends a warm welcome to the students who visit the portals of Government Thirumagal Mills College, Gudiyattam.",
  "Government Thirumagal Mills College is at the threshold of two states — Tamil Nadu and Andhra Pradesh — in a serene atmosphere, serving the cause of Higher Education to rural students. It is a rural co-educational institute which continues to serve the economically backward and socially underprivileged students.",
  "The college upholds the cause of educating India by adopting modern infrastructure and pedagogies. First generation learners from rural backgrounds enter the portals of a learning community. Our mission of bringing all-round development is explored through academic, co-curricular and extracurricular activities.",
  "The college aims to provide sufficient opportunities to each student to grow as responsible citizens — since the progress of the nation depends on the potential of its youth.",
  `The College is completely governed by the rules framed by the Department of Higher Education, Government of Tamil Nadu and is under the control of the Directorate of Collegiate Education.`,
];

export const Route = createFileRoute("/principal-message")({
  head: () => ({
    meta: [
      { title: `Principal's Message — ${SITE.name}` },
      { name: "description", content: `Message from the Principal of ${SITE.name}, Gudiyattam.` },
      { property: "og:url", content: "/principal-message" },
    ],
    links: [{ rel: "canonical", href: "/principal-message" }],
  }),
  loader: async (): Promise<PrincipalData> => {
    try {
      const data = await getPrincipal();
      if (data) return data as PrincipalData;
    } catch {}
    return {
      name: STATIC_PRINCIPAL.name,
      title: STATIC_PRINCIPAL.title,
      qual: STATIC_PRINCIPAL.qual,
      image: STATIC_PRINCIPAL.image,
      message: DEFAULT_MESSAGE,
    };
  },
  component: PrincipalPage,
});

function PrincipalPage() {
  const principal = Route.useLoaderData() as PrincipalData;

  return (
    <>
      <PageHero
        eyebrow="From the Principal's Office"
        title="Welcome to Government Thirumagal Mills College, Gudiyattam."
        subtitle={`${principal.name}, ${principal.qual}`}
      />
      <Section>
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
          <Reveal>
            <Quote className="size-10 text-gold mb-6" />
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              {principal.message.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <p>
                For further information please visit{" "}
                <a href="https://www.tndce.in" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                  www.tndce.in
                </a>.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <div className="font-bold text-primary text-lg">{principal.name}</div>
              <div className="text-sm text-muted-foreground">{principal.title}, {principal.qual}</div>
              <div className="text-sm text-muted-foreground">{SITE.name}, Gudiyattam</div>
              <a href={`mailto:${SITE.email}`} className="text-sm text-gold-deep font-semibold hover:underline mt-1 inline-block">
                {SITE.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl overflow-hidden shadow-elegant border border-border">
              <img
                src={principal.image ?? "/principal.jpeg"}
                alt={`${principal.name} — Principal, ${SITE.name}`}
                className="w-full object-cover object-top"
                style={{ aspectRatio: "3/4" }}
                decoding="async"
                fetchPriority="high"
                onError={(e) => { e.currentTarget.src = "/principal.jpeg"; }}
              />
            </div>
            <div className="mt-5 p-5 rounded-2xl bg-secondary space-y-1">
              <div className="font-bold text-primary">{principal.name}</div>
              <div className="text-sm text-muted-foreground">{principal.title}</div>
              <div className="text-xs text-gold-deep font-semibold">{principal.qual}</div>
              <div className="text-xs text-muted-foreground">{SITE.name}</div>
              <a href={`mailto:${SITE.email}`} className="text-xs text-primary hover:underline block">{SITE.email}</a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
