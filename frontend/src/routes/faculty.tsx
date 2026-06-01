import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { SITE, FACULTY as STATIC_FACULTY } from "@/lib/site-data";
import { getFaculty } from "@/lib/content-fns";
import type { FacultyMember } from "@/lib/content-fns";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: `Faculty — ${SITE.name}` },
      { name: "description", content: `Meet the experienced and qualified faculty members of ${SITE.name}, Gudiyattam.` },
      { property: "og:url", content: "/faculty" },
    ],
    links: [{ rel: "canonical", href: "/faculty" }],
  }),
  loader: async () => {
    try {
      const data = await getFaculty();
      if (data && data.length > 0) return data as FacultyMember[];
    } catch {}
    return STATIC_FACULTY.map((f, i) => ({
      id: String(i + 1),
      name: f.name,
      role: f.role,
      dept: f.dept,
      qual: f.qual,
      focus: f.focus,
      image: null,
    })) as FacultyMember[];
  },
  component: FacultyPage,
});

function FacultyPage() {
  const faculty = Route.useLoaderData() as FacultyMember[];

  return (
    <>
      <PageHero
        eyebrow="Our People"
        title="Experienced faculty dedicated to student success."
        subtitle={`${faculty.length}+ qualified faculty members committed to quality teaching, mentorship and academic excellence.`}
      />
      <Section>
        <SectionHeader title="Faculty Members" desc="Our departments are led by experienced PhD scholars and dedicated educators." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {faculty.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.04}>
              <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant transition-shadow">
                {/* Photo or avatar */}
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-gold/10 to-primary/5 relative grid place-items-center overflow-hidden">
                  {f.image ? (
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="size-20 rounded-full bg-gradient-to-br from-primary to-primary-deep grid place-items-center text-3xl font-extrabold text-gold">
                      {f.name ? f.name.trim()[0].toUpperCase() : <GraduationCap className="size-8" />}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-deep mb-1">{f.dept}</div>
                  <div className="font-bold text-primary">{f.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{f.role}</div>
                  <div className="text-xs text-gold-deep mt-2 font-semibold">{f.qual}</div>
                  {f.focus && <div className="text-xs text-muted-foreground mt-1">Focus: {f.focus}</div>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
