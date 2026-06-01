import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { GraduationCap, Calendar, Layers } from "lucide-react";
import { useState } from "react";
import { getCourses } from "@/lib/content-fns";
import type { PgCourse } from "@/lib/content-fns";

const STATIC: PgCourse[] = [
  { sno: 1, department: "Mathematics", course: "M.Sc. Mathematics", medium: "EM Only", shift: "Shift-I", established: "1982-1983", stream: "Science" },
  { sno: 2, department: "Computer Applications", course: "M.C.A. (Master of Computer Applications)", medium: "EM Only", shift: "Shift-I", established: "2004-2005", stream: "Science" },
  { sno: 3, department: "Economics", course: "M.A. Economics", medium: "EM Only", shift: "Shift-I", established: "2012-2013", stream: "Arts" },
  { sno: 4, department: "Botany", course: "M.Sc. Botany", medium: "TM / EM", shift: "Shift-I & Shift-II", established: "2012-2013", stream: "Science" },
  { sno: 5, department: "Physics", course: "M.Sc. Physics", medium: "TM / EM", shift: "Shift-I", established: "2012-2013", stream: "Science" },
  { sno: 6, department: "Chemistry", course: "M.Sc. Chemistry", medium: "TM / EM", shift: "Shift-I & Shift-II", established: "2012-2013", stream: "Science" },
  { sno: 7, department: "Commerce", course: "M.Com. Commerce", medium: "EM Only", shift: "Shift-I", established: "2012-2013", stream: "Commerce" },
  { sno: 8, department: "Tamil", course: "M.A. Tamil", medium: "TM Only", shift: "Shift-I", established: "2012-2013", stream: "Arts" },
  { sno: 9, department: "English", course: "M.A. English", medium: "EM Only", shift: "Shift-I", established: "2012-2013", stream: "Arts" },
  { sno: 10, department: "History", course: "M.A. History", medium: "EM Only", shift: "Shift-I", established: "2018-2019", stream: "Arts" },
  { sno: 11, department: "Computer Science", course: "M.Sc. Computer Science", medium: "EM Only", shift: "Shift-I", established: "2013-2014", stream: "Science" },
];

export const Route = createFileRoute("/courses/pg")({
  head: () => ({
    meta: [
      { title: `Postgraduate (PG) Courses Offered — ${SITE.name}` },
      { name: "description", content: `Explore the official portfolio of Postgraduate (PG) master degree programmes, departments, and milestones at ${SITE.name}, Gudiyattam.` },
    ],
  }),
  loader: async (): Promise<PgCourse[]> => {
    try {
      const data = await getCourses();
      if (data.pg?.length) return data.pg;
    } catch {}
    return STATIC;
  },
  component: PgCoursesPage,
});

const STREAM_WIDGETS = [
  { id: "Science", label: "Science Masters", color: "bg-blue-500/5 text-blue-600 border-blue-500/10 hover:bg-blue-500/10" },
  { id: "Arts", label: "Arts Masters", color: "bg-amber-500/5 text-amber-600 border-amber-500/10 hover:bg-amber-500/10" },
  { id: "Commerce", label: "Commerce Masters", color: "bg-emerald-500/5 text-emerald-600 border-emerald-500/10 hover:bg-emerald-500/10" },
];

function PgCoursesPage() {
  const programmes = Route.useLoaderData() as PgCourse[];
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const filtered = activeFilter ? programmes.filter((p) => p.stream === activeFilter) : programmes;

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Postgraduate Programmes"
        subtitle="Advance your domain academic matrix with postgraduate master degrees affiliated with Thiruvalluvar University, engineered for specialized analytical skills."
      />

      <Section className="pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {STREAM_WIDGETS.map((widget, i) => {
            const count = programmes.filter((p) => p.stream === widget.id).length;
            return (
              <Reveal key={widget.id} delay={i * 0.05}>
                <button
                  onClick={() => setActiveFilter(activeFilter === widget.id ? null : widget.id)}
                  className={`w-full p-4 border rounded-xl text-center shadow-sm bg-card transition-all cursor-pointer relative ${widget.color} ${activeFilter === widget.id ? "ring-2 ring-primary border-transparent scale-[1.02]" : "opacity-80 hover:opacity-100"}`}
                >
                  <div className="text-xs uppercase tracking-wider font-bold">{widget.label}</div>
                  <div className="text-lg font-black mt-1">{count} Programme{count !== 1 ? "s" : ""}</div>
                  {activeFilter === widget.id && (
                    <span className="absolute top-1.5 right-2 text-[9px] font-bold tracking-tight bg-background px-1.5 py-0.5 rounded border">Filtering</span>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
              <div className="p-5 border-b border-border bg-muted/30 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-base">PG Course Registry & Timeline {activeFilter ? `(${activeFilter} Only)` : ""}</h2>
                </div>
                {activeFilter && (
                  <button onClick={() => setActiveFilter(null)} className="text-xs font-bold text-muted-foreground hover:text-primary border px-2 py-1 rounded bg-background">
                    Clear Filter [x]
                  </button>
                )}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary/5 text-primary border border-primary/10">Affiliated with Thiruvalluvar University</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                      <th className="p-4 font-semibold w-16 text-center">S.No</th>
                      <th className="p-4 font-semibold">Department</th>
                      <th className="p-4 font-semibold">Degree & Course Title</th>
                      <th className="p-4 font-semibold">Operational Batch</th>
                      <th className="p-4 font-semibold text-center w-40">Established Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {filtered.map((prog, index) => (
                      <tr key={prog.sno} className="hover:bg-muted/10 transition-colors group">
                        <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5 group-hover:bg-transparent">{index + 1}</td>
                        <td className="p-4 font-bold text-primary tracking-wide">{prog.department}</td>
                        <td className="p-4">
                          <div className="font-semibold text-foreground flex items-center gap-2 flex-wrap">
                            <span>{prog.course}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground tracking-wide uppercase border border-border/60">{prog.medium}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${prog.shift.includes("Shift-II") ? "bg-gold/10 text-gold-deep" : "bg-primary/5 text-primary"}`}>
                            <Layers className="size-3" /> {prog.shift}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                            <Calendar className="size-3.5 text-muted-foreground" /> {prog.established}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
