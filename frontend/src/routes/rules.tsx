import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { Clock, ShieldAlert, CheckCircle, AlertTriangle, UserX, IdCard, CalendarDays, FileText } from "lucide-react";

export const Route = createFileRoute("/rules")({
  head: () => ({
    meta: [
      { title: `Rules & Regulations — ${SITE.name}` },
      { name: "description", content: `Official institutional guidelines, shift timings, code of conduct, and mandatory university attendance criteria at ${SITE.name}, Gudiyattam.` },
    ],
  }),
  component: RulesAndRegulationsPage,
});

function RulesAndRegulationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="Rules & Regulations"
        subtitle="Foundational parameters, operational timings, and strict codes of conduct established to maintain discipline, safety, and peak academic accountability."
      />

      {/* Section 1: Shift Timings & Basic Info */}
      <Section className="pb-0">
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal delay={0.05}>
            <div className="bg-card border border-border p-6 rounded-2xl h-full flex gap-4 items-start shadow-sm">
              <div className="p-3 rounded-xl bg-gold/10 text-gold-deep shrink-0">
                <Clock className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-lg">Shift I Timings</h3>
                <p className="text-sm text-muted-foreground mt-1 font-medium">
                  Morning Batch:<br />
                  <span className="text-base font-bold text-foreground block mt-1">9:00 AM – 1:10 PM</span>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-card border border-border p-6 rounded-2xl h-full flex gap-4 items-start shadow-sm">
              <div className="p-3 rounded-xl bg-gold/10 text-gold-deep shrink-0">
                <Clock className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-lg">Shift II Timings</h3>
                <p className="text-sm text-muted-foreground mt-1 font-medium">
                  Evening Batch:<br />
                  <span className="text-base font-bold text-foreground block mt-1">1:20 PM – 5:30 PM</span>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-card border border-border p-6 rounded-2xl h-full flex gap-4 items-start shadow-sm">
              <div className="p-3 rounded-xl bg-gold/10 text-gold-deep shrink-0">
                <CalendarDays className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-lg">Semester Span</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Each standard academic semester strictly consists of exactly <span className="font-bold text-foreground">90 (Ninety) working days</span> under Thiruvalluvar University rules.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Section 2: Core Attendance Policies & University Regulations */}
      <Section className="pb-0">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: General Policy Statement */}
          <div className="lg:col-span-4 space-y-4">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-medium mb-2">
                University Mandate
              </div>
              <h2 className="text-2xl font-bold text-primary">Attendance Policy</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                The college strictly follows the current rules of the <strong>Thiruvalluvar University</strong>. Attendance Register maintenance and continuous internal assessment metrics are compulsorily implemented across all semesters.
              </p>
              <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-xs text-red-600 dark:text-red-400 font-medium leading-relaxed">
                <strong>Rule:</strong> 75% of attendance is compulsory for each semester in each course. Students will not be allowed to write the examination if they do not have the minimum attendance.
              </div>
            </Reveal>
          </div>

          {/* Right Column: Detailed Condition of Attendance Cards */}
          <div className="lg:col-span-8 space-y-6">
            <Reveal>
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <FileText className="size-5 text-gold-deep" /> Condition of Attendance & Condonation
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Details of condonation of attendance for students who do not meet the standard required attendance threshold:
              </p>
            </Reveal>

            <div className="space-y-4">
              {/* Card 1: 65% Threshold */}
              <Reveal delay={0.05}>
                <div className="bg-card border border-border p-5 rounded-xl flex gap-4 items-start shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-600 font-bold text-sm flex items-center justify-center shrink-0">
                    65%
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">Immediate Exam Permission Eligibility</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      In a Semester, the student who holds <span className="font-semibold text-foreground">65% of attendance</span> must pay <span className="font-semibold text-foreground">Rs. 1000/-</span> as a condonation fee and receive the official permission orders to write the exam.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Card 2: 50% - 64% Threshold */}
              <Reveal delay={0.1}>
                <div className="bg-card border border-border p-5 rounded-xl flex gap-4 items-start shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-600 font-bold text-sm flex items-center justify-center shrink-0">
                    50%
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">Deferred Next Semester Permission</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Those who hold <span className="font-semibold text-foreground">50% and above, or less than 65%</span> must pay <span className="font-semibold text-foreground">Rs. 1000/-</span> as a condonation fee and receive the permission orders to write the exam <span className="font-semibold text-amber-600 dark:text-amber-400">in the next semester only</span>.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Card 3: Below 50% Threshold */}
              <Reveal delay={0.15}>
                <div className="bg-card border border-border p-5 rounded-xl flex gap-4 items-start shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-600 font-bold text-sm flex items-center justify-center shrink-0">
                    &lt;50%
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">Mandatory Institutional Re-Admission</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Those who hold <span className="font-semibold text-foreground">less than 50% of attendance</span>, after the completion of their period of study, <span className="font-semibold text-red-600 dark:text-red-400">must get re-admitted</span> to complete the required attendance tracking matrix to write the exam in the same semester block.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </Section>

      {/* Section 3: Identity Card & Conduct Guidelines */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Identity Card Focus Column */}
          <div className="lg:col-span-4 space-y-4">
            <Reveal>
              <div className="p-6 border border-border rounded-2xl bg-card space-y-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-muted/5 font-bold scale-150 transform translate-x-4 -translate-y-4 select-none">
                  <IdCard className="size-24" />
                </div>
                <div className="p-3 rounded-xl bg-primary/5 text-primary shrink-0 inline-block">
                  <IdCard className="size-6 text-gold-deep" />
                </div>
                <h3 className="text-lg font-bold text-primary">Identity Card Mandate</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Students must carry their official institutional Identity Cards always and produce the same instantly on demand to the college authorities.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="p-5 border border-border bg-muted/20 rounded-2xl text-xs text-muted-foreground leading-relaxed">
                <strong>Student Accountability:</strong> The responsibility completely lies with the students to attend classes systematically, earn regular attendance checkpoints, and know their live attendance status directly from their respective HOD.
              </div>
            </Reveal>
          </div>

          {/* Student Code of Conduct List Column */}
          <div className="lg:col-span-8 space-y-6">
            <Reveal>
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <ShieldAlert className="size-5 text-gold-deep" /> Rules and Regulations for Students
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Every enrolled pupil must adhere closely to the standard operational discipline parameters inside the premises:
              </p>
            </Reveal>

            <div className="space-y-3">
              {[
                "Students should wear clean and neat dress during their regular classes and college functions.",
                "Students should wish their teachers whenever they get into the class room context.",
                "To get into the Department Room / Laboratory / Office Room, the student should get permission from the corresponding authority.",
                "Students should not involve in any caste / political / religious parties inside the college premises.",
                "Damaging College properties will lead to severe punishments.",
                "Students can take their complaints (if any) to the Head of the Department for other staff members. The students can meet the Principal if necessary.",
                "Ragging is a severe crime. Legal actions will be initiated instantly against the students who indulge in ragging."
              ].map((rule, idx) => (
                <Reveal key={idx} delay={idx * 0.04}>
                  <div className="flex gap-4 p-4 border border-border bg-card rounded-xl hover:border-gold/20 transition-all">
                    <span className="font-extrabold text-xs text-gold-deep bg-gold/5 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                      {rule}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}