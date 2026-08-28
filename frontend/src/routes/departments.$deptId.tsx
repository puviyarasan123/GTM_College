import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { getDepartment } from "@/lib/content-fns";
import type { Department } from "@/lib/content-fns";
import { findDepartmentContent } from "@/lib/department-content";
import type { DeptBlock, DeptStaff, DeptSupervisor } from "@/lib/department-content";
import { getIcon } from "@/lib/icons";
import { RichText } from "@/components/site/RichText";
import { ArrowLeft, FileWarning, Search, Users } from "lucide-react";

/**
 * Department pages are database-backed (admin → Departments). If the API is
 * unreachable we fall back to the bundled seed copy so the page never goes blank.
 */
async function loadDepartment(slug: string): Promise<Department | null> {
  try {
    const row = await getDepartment(slug);
    if (row) return row;
  } catch {
    // fall through to the bundled copy
  }
  const seed = findDepartmentContent(slug);
  return seed ? ({ id: seed.slug, ...seed } as Department) : null;
}

export const Route = createFileRoute("/departments/$deptId")({
  loader: ({ params }) => loadDepartment(params.deptId),
  head: ({ params, loaderData }) => {
    const name = loaderData?.name ?? titleCase(params.deptId);
    return {
      meta: [
        { title: `Department of ${name} — ${SITE.name}` },
        {
          name: "description",
          content:
            loaderData?.summary ||
            `Explore faculty profiles, research areas, and programmes under the Department of ${name} at Govt. Thirumagal Mills College.`,
        },
      ],
    };
  },
  component: DepartmentPage,
});

function titleCase(slug: string) {
  return slug.replace(/-/g, " ").replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
}

// ── Blocks ───────────────────────────────────────────────────────────────────

function BlockCard({ block }: { block: DeptBlock }) {
  const Icon = getIcon(block.icon);
  return (
    <div className="group h-full border border-border bg-card p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-elegant transition-shadow space-y-4">
      <div className="flex items-center gap-3 text-primary border-b border-border pb-3">
        <span className="size-9 rounded-xl bg-gold/10 grid place-items-center shrink-0 group-hover:bg-gold/20 transition-colors">
          <Icon className="size-4.5 text-gold-deep" />
        </span>
        <h2 className="text-lg font-bold leading-tight">{block.heading}</h2>
      </div>

      {block.kind === "text" && (
        <>
          {block.quote && (
            <p className="text-sm italic text-muted-foreground font-medium bg-muted/40 p-3 rounded-xl border border-dashed text-center">
              {block.quote}
            </p>
          )}
          <div className="text-sm text-foreground/95 leading-relaxed text-justify space-y-3">
            {block.body.split(/\n{2,}/).map((para, i) => (
              <p key={i}>
                <RichText text={para} />
              </p>
            ))}
          </div>
        </>
      )}

      {block.kind === "list" && (
        <>
          {block.intro && (
            <p className="text-sm text-foreground/95 leading-relaxed text-justify">
              <RichText text={block.intro} />
            </p>
          )}
          <ul className={`grid gap-3 text-sm text-foreground/90 ${block.twoCol ? "md:grid-cols-2" : ""}`}>
            {block.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.35 }}
                className="flex items-start gap-2.5 bg-muted/20 p-3 rounded-xl border border-border/40 hover:border-gold/40 transition-colors"
              >
                <span className="text-gold-deep font-bold mt-0.5 leading-none">•</span>
                <span>
                  <RichText text={item} />
                </span>
              </motion.li>
            ))}
          </ul>
        </>
      )}

      {block.kind === "cards" && (
        <>
          {block.intro && (
            <p className="text-sm text-foreground/95 leading-relaxed text-justify">
              <RichText text={block.intro} />
            </p>
          )}
          <div className="grid gap-3 text-sm text-foreground/90">
            {block.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.4 }}
                className="flex gap-3 bg-muted/10 p-3.5 rounded-xl border border-border/50 hover:bg-muted/20 transition-colors"
              >
                <span className="mt-1.5 size-1.5 rounded-full bg-gold-deep shrink-0" />
                <p>
                  {item.title && <strong className="text-primary">{item.title}: </strong>}
                  <RichText text={item.text} />
                </p>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** Groups consecutive `half` blocks into two-column rows. */
function BlockGrid({ blocks }: { blocks: DeptBlock[] }) {
  const rows: DeptBlock[][] = [];
  for (const block of blocks) {
    const last = rows[rows.length - 1];
    if (block.half && last?.length === 1 && last[0].half) last.push(block);
    else rows.push([block]);
  }
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {rows.map((row, i) => (
        <Reveal key={i} delay={Math.min(i * 0.05, 0.25)}>
          <div className={row.length === 2 ? "grid md:grid-cols-2 gap-6" : ""}>
            {row.map((block, j) => (
              <BlockCard key={j} block={block} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ── Staff tables ─────────────────────────────────────────────────────────────

function StaffTable({ heading, staff }: { heading: string; staff: DeptStaff[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter((p) =>
      [p.name, p.qualification, p.designation, p.shift].some((v) => (v ?? "").toLowerCase().includes(q)),
    );
  }, [staff, query]);

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
      <div className="p-5 border-b border-border bg-muted/30 flex flex-wrap items-center gap-3">
        <Users className="size-5 text-gold-deep" />
        <h2 className="font-bold text-primary text-base flex-1 min-w-40">{heading}</h2>
        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {filtered.length} of {staff.length}
        </span>
        {staff.length > 6 && (
          <div className="relative w-full sm:w-56">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search staff…"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-background border border-border text-xs focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
              <th className="p-4 font-semibold">Name of the staff</th>
              <th className="p-4 font-semibold">Qualification</th>
              <th className="p-4 font-semibold">Designation</th>
              <th className="p-4 font-semibold text-center w-28">Shift</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {filtered.map((prof, i) => (
              <tr key={`${prof.name}-${i}`} className="hover:bg-muted/20 transition-colors">
                <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{prof.sno ?? i + 1}</td>
                <td className="p-4 font-bold text-primary">
                  {prof.name}
                  {prof.email && (
                    <a href={`mailto:${prof.email}`} className="block text-[11px] font-medium text-gold-deep hover:underline">
                      {prof.email}
                    </a>
                  )}
                </td>
                <td className="p-4 font-mono text-xs text-foreground/80">{prof.qualification}</td>
                <td className="p-4 text-xs font-semibold text-muted-foreground">
                  <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{prof.designation}</span>
                </td>
                <td className="p-4 text-center">
                  {prof.shift && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary uppercase whitespace-nowrap">
                      {prof.shift}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-sm text-muted-foreground">
                  No staff match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SupervisorTable({ heading, supervisors }: { heading: string; supervisors: DeptSupervisor[] }) {
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
      <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
        <Users className="size-5 text-gold-deep" />
        <h2 className="font-bold text-primary text-base">{heading}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="p-4 font-semibold w-16 text-center">SL. NO</th>
              <th className="p-4 font-semibold">Supervisor name</th>
              <th className="p-4 font-semibold">Qualification</th>
              <th className="p-4 font-semibold">Designation</th>
              <th className="p-4 font-semibold text-center w-32">Approved M.Phil</th>
              <th className="p-4 font-semibold text-center w-32">Approved Ph.D</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {supervisors.map((sup, i) => (
              <tr key={`${sup.name}-${i}`} className="hover:bg-muted/20 transition-colors">
                <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5">{sup.sno ?? i + 1}</td>
                <td className="p-4 font-bold text-primary">{sup.name}</td>
                <td className="p-4 font-mono text-xs text-foreground/80">{sup.qualification}</td>
                <td className="p-4 text-xs font-semibold text-muted-foreground">
                  <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">{sup.designation}</span>
                </td>
                <td className="p-4 text-center text-xs font-bold text-primary">{sup.mphil}</td>
                <td className="p-4 text-center text-xs font-bold text-primary">{sup.phd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

function DepartmentPage() {
  const dept = Route.useLoaderData();
  const { deptId } = Route.useParams();

  if (!dept) {
    const name = titleCase(deptId);
    return (
      <>
        <PageHero
          eyebrow="Academic Registry"
          title={`Department of ${name}`}
          subtitle="Cultivating domain expertise guided by Thiruvalluvar University parameters."
        />
        <Section>
          <div className="max-w-2xl mx-auto text-center border border-dashed border-border rounded-2xl p-10 bg-card space-y-4">
            <FileWarning className="size-8 text-gold-deep mx-auto" />
            <h3 className="text-base font-bold text-primary">Department profile coming soon</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The introduction, milestones and staff registry for the Department of {name} are being prepared and
              will appear here shortly.
            </p>
            <Link to="/departments" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
              <ArrowLeft className="size-4" /> Back to all departments
            </Link>
          </div>
        </Section>
      </>
    );
  }

  const blocks = (dept.blocks ?? []) as DeptBlock[];
  const staff = (dept.staff ?? []) as DeptStaff[];
  const supervisors = (dept.supervisors ?? []) as DeptSupervisor[];
  const isEmpty = blocks.length === 0 && staff.length === 0 && supervisors.length === 0;

  return (
    <>
      <PageHero
        eyebrow={dept.eyebrow || "Academic Registry"}
        title={dept.heroTitle || `Department of ${dept.name}`}
        subtitle={dept.heroSubtitle || dept.summary}
      />

      {blocks.length > 0 && (
        <Section>
          <BlockGrid blocks={blocks} />
        </Section>
      )}

      {staff.length > 0 && (
        <Section className={blocks.length > 0 ? "pt-0" : ""}>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <StaffTable heading={dept.staffHeading || `Faculty Registry for ${dept.name}`} staff={staff} />
            </Reveal>
          </div>
        </Section>
      )}

      {supervisors.length > 0 && (
        <Section className="pt-0">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <SupervisorTable
                heading={dept.supervisorsHeading || "Approved Research Supervisors (M.Phil. / Ph.D.)"}
                supervisors={supervisors}
              />
            </Reveal>
          </div>
        </Section>
      )}

      {isEmpty && (
        <Section>
          <div className="max-w-2xl mx-auto text-center border border-dashed border-border rounded-2xl p-10 bg-card space-y-4">
            <FileWarning className="size-8 text-gold-deep mx-auto" />
            <h3 className="text-base font-bold text-primary">Department profile coming soon</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Content for the Department of {dept.name} is being prepared and will appear here shortly.
            </p>
          </div>
        </Section>
      )}

      <Section className="pt-0">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
          >
            <ArrowLeft className="size-4" /> All departments
          </Link>
        </div>
      </Section>
    </>
  );
}
