import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { getAlumni } from "@/lib/content-fns";
import type { AlumniData } from "@/lib/content-fns";
import { CheckCircle2, Users } from "lucide-react";

const DEFAULT: AlumniData = {
  heading: "Alumni Association",
  intro: "An alumnae association is an association of graduates or, more broadly, of former students. It is sometimes called an \"alumni meet\". The College has an Alumnae association which was established in 2008. The association conducts regular alumnae meets annually.",
  sections: [
    {
      title: "Necessities of an Alumnae Association",
      body: "The enthusiasm and willingness of several individuals who are willing to take on the organizational initiative and sustain it. The interest of a reasonable alumnus to participate in the association activities.",
    },
    {
      title: "Alumnae Suggestion for Post Graduate Courses",
      body: "Institution has a good affinity with the Alumnae. The Alumnae has given a positive feedback. The Association conducts its annual meeting every year and provides a platform for the alumnae to reunite. They had expressed that the Institution has to open PG courses so that they could pursue the Post Graduate course in the same institution before being placed. Considering their request, IQAC suggested to the management to obtain the approval from the university to start Post graduate courses. They also prompted to give them an opportunity to participate in the Cultural events held in the Institution, considering which they were asked to perform an event on the College Day.",
    },
    {
      title: "Modes of Functioning",
      body: "The college has a registered alumni association. The Alumni Associations functions through two modes:\n\n(i) as an independent organisation,\n\n(ii) as an association endorsed by the College.\n\nThe independent alumni association meet as and when necessary arise. Principal and senior faculties are invited to participate to offer suggestion to improve the welfare of the college. Alumni association endorsed by the college meets once in a year. Principal being the chief coordinator convene the meeting and present the immediate needs of the college, while revving comments and suggestions from the alumni for the development of the college. Prominent alumni facilitate the prospective students for employment generation. Alumni have contributed in kind and cash for the development of the department and college. Steps are being implemented to strength the alumni association to play an active role in the development of the college.",
    },
  ],
  objectives: [
    "To keep a roster of all the Alumni of the college and establish a lifelong relationship with the Alumni.",
    "Maintaining the current information of the Alumni.",
    "To encourage, foster and promote close relations among the alumni of this century crossed prestigious institutions.",
    "To motivate the Alumni to keep themselves engaged in productive pursuits useful to the society.",
    "To provide a forum for the Alumni for exchange of ideas on academic, cultural and social issues by organizing and coordinating reunion activities of the Alumni.",
  ],
  images: [],
};

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: `Alumni Association — ${SITE.name}` },
      { name: "description", content: `Learn about the Alumni Association of ${SITE.name}, Gudiyattam — established in 2008.` },
      { property: "og:url", content: "/alumni" },
    ],
    links: [{ rel: "canonical", href: "/alumni" }],
  }),
  loader: async (): Promise<AlumniData> => {
    try {
      const data = await getAlumni();
      if (data) return data;
    } catch {}
    return DEFAULT;
  },
  component: AlumniPage,
});

function AlumniPage() {
  const data = Route.useLoaderData() as AlumniData;

  return (
    <>
      <PageHero eyebrow="Our Community" title={data.heading} subtitle="Government Thirumagal Mills College has a registered alumni association fostering lifelong bonds since 2008." />

      <Section>
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <Reveal>
            <div className="flex gap-4 p-6 rounded-2xl bg-secondary border border-border">
              <div className="size-12 shrink-0 rounded-xl bg-gradient-to-br from-primary to-primary-deep grid place-items-center">
                <Users className="size-6 text-gold" />
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{data.intro}</p>
            </div>
          </Reveal>

          {/* Images (if any) */}
          {data.images && data.images.length > 0 && (
            <Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.images.map((img, i) => (
                  <figure key={i} className="group relative overflow-hidden rounded-2xl bg-muted">
                    <img src={img.url} alt={img.caption} className="aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {img.caption && (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-deep/90 to-transparent p-4 text-primary-foreground text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </Reveal>
          )}

          {/* Sections */}
          {data.sections.map((sec, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-xl font-bold text-primary mb-4">{sec.title}</h2>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  {sec.body.split("\n\n").map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Objectives */}
          {data.objectives.length > 0 && (
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-xl font-bold text-primary mb-6">Main Objectives of the Alumni Association</h2>
                <ul className="space-y-3">
                  {data.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="size-5 text-gold-deep shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </Section>
    </>
  );
}
