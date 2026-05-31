import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { Microscope, Calendar, Award, CheckCircle2, FlaskConical } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/courses/research")({
  head: () => ({
    meta: [
      { title: `Research Courses (M.Phil. & Ph.D.) — ${SITE.name}` },
      { name: "description", content: `Explore official Doctor of Philosophy (Ph.D.) and Master of Philosophy (M.Phil.) programs at ${SITE.name}, Gudiyattam.` },
    ],
  }),
  component: ResearchCoursesPage,
});

const researchRegistry = [
  {
    department: "Computer Science",
    category: "Science",
    programs: [
      { degree: "M.Phil. Computer Science", type: "Full Time & Part Time", established: "2012-2013" },
      { degree: "Ph.D. Computer Science", type: "Full Time & Part Time", established: "2012-2013" },
    ],
  },
  {
    department: "Mathematics",
    category: "Science",
    programs: [
      { degree: "M.Phil. Mathematics", type: "Full Time & Part Time", established: "2012-2013" },
      { degree: "Ph.D. Mathematics", type: "Full Time & Part Time", established: "2012-2013" },
    ],
  },
  {
    department: "Chemistry",
    category: "Science",
    programs: [
      { degree: "M.Phil. Chemistry", type: "Full Time & Part Time", established: "2018-2019" },
      { degree: "Ph.D. Chemistry", type: "Full Time & Part Time", established: "2018-2019" },
    ],
  },
  {
    department: "Physics",
    category: "Science",
    programs: [
      { degree: "M.Phil. Physics", type: "Full Time & Part Time", established: "2018-2019" },
      { degree: "Ph.D. Physics", type: "Full Time & Part Time", established: "2018-2019" },
    ],
  },
  {
    department: "Botany",
    category: "Science",
    programs: [
      { degree: "M.Phil. Botany", type: "Full Time & Part Time", established: "2018-2019" },
      { degree: "Ph.D. Botany", type: "Full Time & Part Time", established: "2018-2019" },
    ],
  },
  {
    department: "English",
    category: "Arts",
    programs: [
      { degree: "M.Phil. English", type: "Full Time & Part Time", established: "2018-2019" },
      { degree: "Ph.D. English", type: "Full Time & Part Time", established: "2018-2019" },
    ],
  },
  {
    department: "Tamil",
    category: "Arts",
    programs: [
      { degree: "M.Phil. Tamil", type: "Full Time & Part Time", established: "2018-2019" },
      { degree: "Ph.D. Tamil", type: "Full Time & Part Time", established: "2018-2019" },
    ],
  },
  {
    department: "Economics",
    category: "Arts",
    programs: [
      { degree: "M.Phil. Economics", type: "Full Time & Part Time", established: "2018-2019" },
      { degree: "Ph.D. Economics", type: "Full Time & Part Time", established: "2018-2019" },
    ],
  },
  {
    department: "Commerce",
    category: "Commerce",
    programs: [
      { degree: "M.Phil. Commerce", type: "Full Time & Part Time", established: "2018-2019" },
      { degree: "Ph.D. Commerce", type: "Full Time & Part Time", established: "2018-2019" },
    ],
  },
];

function ResearchCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredRegistry = selectedCategory
    ? researchRegistry.filter((r) => r.category === selectedCategory)
    : researchRegistry;

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Research Programmes"
        subtitle="Explore specialized M.Phil. and Doctor of Philosophy (Ph.D.) scholars tracks authorized under Thiruvalluvar University frameworks to promote institutional research excellence."
      />

      {/* Filter Menu Widgets */}
      <Section className="pb-0">
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          {[
            { id: null, label: "All Scholars Streams" },
            { id: "Science", label: "Science Departments" },
            { id: "Arts", label: "Arts & Humanities" },
            { id: "Commerce", label: "Commerce Tracks" },
          ].map((tab, idx) => (
            <Reveal key={idx} delay={idx * 0.04}>
              <button
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? "bg-primary border-primary text-primary-foreground shadow-sm scale-105"
                    : "bg-card border-border text-muted-foreground hover:text-primary hover:border-primary/40"
                }`}
              >
                {tab.label}
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Grid Layout Breakdown */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRegistry.map((dept, index) => (
              <Reveal key={dept.department} delay={index * 0.04}>
                <div className="border border-border rounded-2xl bg-card shadow-sm hover:border-gold/30 hover:shadow-elegant transition-all flex flex-col h-full overflow-hidden group">
                  
                  {/* Card Header Top Block */}
                  <div className="p-5 bg-muted/30 border-b border-border flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold-deep bg-gold/10 px-2 py-0.5 rounded">
                        {dept.category}
                      </span>
                      <h3 className="text-base font-bold text-primary tracking-tight mt-1.5 group-hover:text-gold-deep transition-colors">
                        Dept. of {dept.department}
                      </h3>
                    </div>
                    <div className="p-2 rounded-xl bg-background border border-border/80 shrink-0 text-primary/70">
                      {dept.category === "Science" ? <FlaskConical className="size-4 text-blue-500" /> : <Microscope className="size-4 text-amber-500" />}
                    </div>
                  </div>

                  {/* Degree Track Body Area */}
                  <div className="p-5 flex-1 space-y-4">
                    {dept.programs.map((prog, pIdx) => (
                      <div key={pIdx} className="p-3 border border-border/50 bg-muted/10 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground/90">
                          <Award className="size-4 text-gold-deep shrink-0" />
                          <span>{prog.degree}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs gap-4 text-muted-foreground pt-1 border-t border-border/40">
                          <span className="inline-flex items-center gap-1 font-medium bg-background border px-1.5 py-0.5 rounded text-[10px]">
                            <CheckCircle2 className="size-3 text-emerald-500" /> {prog.type}
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold whitespace-nowrap">
                            <Calendar className="size-3 text-muted-foreground" /> {prog.established}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footing Badge Element */}
                  <div className="px-5 py-3 bg-muted/20 border-t border-border/40 text-[10px] font-semibold text-muted-foreground/80 tracking-wide flex items-center justify-between">
                    <span>Affiliation Status</span>
                    <span className="text-primary font-medium">TVU Approved Center</span>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}