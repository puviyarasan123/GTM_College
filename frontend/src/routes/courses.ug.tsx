import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { GraduationCap, Calendar, Layers } from "lucide-react";
import { useState } from "react";
import { getCourses } from "@/lib/content-fns";
import type { UgCourse } from "@/lib/content-fns";

const STATIC: UgCourse[] = [
  { sno: 1, department: "Mathematics", course: "B.Sc. Mathematics", medium: "TM / EM", shift: "Shift-I & Shift-II", established: "1964-1965", stream: "Science" },
  { sno: 2, department: "Economics", course: "B.A. Economics", medium: "EM Only", shift: "Shift-I", established: "1964-1965", stream: "Arts" },
  { sno: 3, department: "Botany", course: "B.Sc. Botany", medium: "TM / EM", shift: "Shift-I & Shift-II", established: "1969-1970", stream: "Science" },
  { sno: 4, department: "Physics", course: "B.Sc. Physics", medium: "TM / EM", shift: "Shift-I", established: "1969-1970", stream: "Science" },
  { sno: 5, department: "Chemistry", course: "B.Sc. Chemistry", medium: "TM / EM", shift: "Shift-I & Shift-II", established: "1980-1981", stream: "Science" },
  { sno: 6, department: "Commerce", course: "B.Com. Commerce", medium: "EM Only", shift: "Shift-I", established: "2005-2006", stream: "Commerce" },
  { sno: 7, department: "Tamil", course: "B.A. Tamil", medium: "TM Only", shift: "Shift-I", established: "2012-2013", stream: "Arts" },
  { sno: 8, department: "English", course: "B.A. English", medium: "EM Only", shift: "Shift-I", established: "2012-2013", stream: "Arts" },
  { sno: 9, department: "Computer Science", course: "B.Sc. Computer Science", medium: "EM Only", shift: "Shift-I", established: "2012-2013", stream: "Science" },
  { sno: 10, department: "Computer Science & Apps", course: "B.C.A. (Computer Applications)", medium: "EM Only", shift: "Shift-I", established: "2013-2014", stream: "Science" },
  { sno: 11, department: "History", course: "B.A. History", medium: "EM Only", shift: "Shift-I", established: "2013-2014", stream: "Arts" },
  { sno: 12, department: "Zoology", course: "B.Sc. Zoology", medium: "EM Only", shift: "Shift-I", established: "2013-2014", stream: "Science" },
  { sno: 13, department: "Business Administration", course: "B.B.A. Business Administration", medium: "EM Only", shift: "Shift-I", established: "2013-2014", stream: "Management" },
];

export const Route = createFileRoute("/courses/ug")({
  head: () => ({
    meta: [
      { title: `Undergraduate (UG) Courses Offered — ${SITE.name}` },
      { name: "description", content: `Explore the official portfolio of Undergraduate (UG) degree programmes, departments, and timelines at ${SITE.name}, Gudiyattam.` },
    ],
  }),
  loader: async (): Promise<UgCourse[]> => {
    try {
      const data = await getCourses();
      if (data.ug?.length) return data.ug;
    } catch {}
    return STATIC;
  },
  component: UgCoursesPage,
});

const STREAM_WIDGETS = [
  { id: "Science", label: "Science Tracks", color: "bg-blue-500/5 text-blue-600 border-blue-500/10 hover:bg-blue-500/10" },
  { id: "Arts", label: "Arts Tracks", color: "bg-amber-500/5 text-amber-600 border-amber-500/10 hover:bg-amber-500/10" },
  { id: "Commerce", label: "Commerce Tracks", color: "bg-emerald-500/5 text-emerald-600 border-emerald-500/10 hover:bg-emerald-500/10" },
  { id: "Management", label: "Management Tracks", color: "bg-purple-500/5 text-purple-600 border-purple-500/10 hover:bg-purple-500/10" },
];

function UgCoursesPage() {
  const programmes = Route.useLoaderData() as UgCourse[];
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const filtered = activeFilter ? programmes.filter((p) => p.stream === activeFilter) : programmes;

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Undergraduate Programmes"
        subtitle="Explore our comprehensive array of Government-sanctioned UG degrees affiliated with Thiruvalluvar University, designed to cultivate core foundational expertise."
      />

      <Section className="pb-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
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
                  <h2 className="font-bold text-primary text-base">UG Course Registry & Timeline {activeFilter ? `(${activeFilter} Only)` : ""}</h2>
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
