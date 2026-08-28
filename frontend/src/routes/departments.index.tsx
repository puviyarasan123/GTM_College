import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { getDepartments } from "@/lib/content-fns";
import type { Department } from "@/lib/content-fns";
import { DEPARTMENT_CONTENT } from "@/lib/department-content";
import { getIcon } from "@/lib/icons";
import { ChevronRight } from "lucide-react";

async function loadDepartments(): Promise<Department[]> {
  try {
    const rows = await getDepartments();
    if (rows.length > 0) return rows;
  } catch {
    // fall through to the bundled copy
  }
  return DEPARTMENT_CONTENT.filter((d) => d.active).map((d) => ({ id: d.slug, ...d })) as Department[];
}

export const Route = createFileRoute("/departments/")({
  loader: loadDepartments,
  head: () => ({
    meta: [
      { title: `Departments — ${SITE.name}` },
      { name: "description", content: "Explore the departments at Govt. Thirumagal Mills College — Science, Arts, Commerce & Management." },
      { property: "og:url", content: "/departments" },
    ],
    links: [{ rel: "canonical", href: "/departments" }],
  }),
  component: DepartmentsIndex,
});

function DepartmentsIndex() {
  const departments = Route.useLoaderData() as Department[];

  return (
    <>
      <PageHero
        eyebrow="Schools & Departments"
        title={`${departments.length} departments. One culture of excellence.`}
        subtitle="Each department is dedicated to quality teaching, student mentorship and academic growth across Science, Arts, Commerce and Management — affiliated to Thiruvalluvar University."
      />
      <Section>
        <SectionHeader title="Our Departments" desc="UG and PG programmes across Science, Arts, Commerce and Management." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {departments.map((d, i) => {
            const Icon = getIcon(d.icon);
            return (
              <Reveal key={d.slug} delay={Math.min(i * 0.04, 0.4)}>
                <Link
                  to="/departments/$deptId"
                  params={{ deptId: d.slug }}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 h-full overflow-hidden hover:border-primary/30 transition-all hover:shadow-elegant hover:-translate-y-1"
                >
                  <div className="absolute -top-12 -right-12 size-32 rounded-full bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-primary-deep text-primary-foreground grid place-items-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="size-5" />
                  </div>
                  {d.code && <div className="text-[10px] font-bold tracking-widest text-gold-deep mb-1">{d.code}</div>}
                  <h3 className="font-bold text-primary leading-snug">{d.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">{d.summary}</p>
                  <div className="mt-5 text-xs font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View department <ChevronRight className="size-3.5" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
