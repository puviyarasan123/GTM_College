import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { ShieldCheck, Users, Award, Landmark } from "lucide-react";

export const Route = createFileRoute("/governing-council")({
  head: () => ({
    meta: [
      { title: `Governing Council — ${SITE.name}` },
      { name: "description", content: `Meet the governing apex council of ${SITE.name}, responsible for institutional development, policies, and management.` },
    ],
  }),
  component: GoverningCouncilPage,
});

const councilMembers = [
  { sno: 1, name: "Dr. J. EBANASAR, M.Sc., Ph.D.", role: "Principal" },
  { sno: 2, name: "Dr. A. Sridhar (I/C)", role: "Head, Dept. of English" },
  { sno: 3, name: "Dr. D. Ramasamy", role: "Head, Dept. of Zoology" },
  { sno: 4, name: "Dr. S. KARUNANITHI", role: "Head, Dept. of Mathematics" },
  { sno: 5, name: "Dr. A. THAMARAI", role: "Head, Dept. of Physics" },
  { sno: 6, name: "Dr. A. Thamim Ansari", role: "Head, Dept. of Chemistry" },
  { sno: 7, name: "Dr. K. ARULANANDAM", role: "Head, Dept. of Computer Applications" },
  { sno: 8, name: "Dr. P. Karthikeyan", role: "Head, Dept. of Commerce" },
  { sno: 9, name: "Dr. K. VIJAYARANGAM", role: "Head, Dept. of History" },
  { sno: 10, name: "Prof. S. KARPAGAM", role: "Head, Dept. of Economics" },
  { sno: 11, name: "Dr. M.G. LOGANATHAN", role: "Head, Dept. of Business Administration" },
  { sno: 12, name: "Dr. M. Kalpana", role: "Head, Dept. of Tamil" },
  { sno: 13, name: "Dr. Sujatha", role: "Head, Dept. of Botany (I/C)" },
  { sno: 14, name: "Dr. K. ARULANANDAM", role: "Head, Dept. of Computer Science (I/C)" },
  { sno: 15, name: "Dr. Chakravarthy", role: "Physical Director" },
  { sno: 16, name: "Prof. S. SENTHILKUMAR", role: "Librarian (I/C)" },
];

function GoverningCouncilPage() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="College Governing Council"
        subtitle="The apex executive body responsible for core decision-making, strategic growth directives, and the maintenance of institutional excellence."
      />

      {/* Description Context Callout */}
      <Section className="pb-0">
        <Reveal>
          <div className="max-w-4xl mx-auto bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="p-4 rounded-2xl bg-gold/10 text-gold-deep shrink-0">
              <Landmark className="size-8" />
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-xl font-bold text-primary">Role & Mandate of the Council</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The College Council consists of all the structural Heads of Departments, the Controller of Examinations, the Physical Director, and the Librarian. The body holds the unique privilege of strategic decision-making, framework approvals, and voicing developmental pathways crucial to the systematic expansion of the college campus infrastructure and curriculum parameters.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Council Members List Table Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <Reveal delay={0.05}>
            <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
              <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                <Users className="size-5 text-gold-deep" />
                <h3 className="font-bold text-primary text-base">Council Membership Roster</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                      <th className="p-4 font-semibold w-20 text-center">S.No</th>
                      <th className="p-4 font-semibold">Name of the Council Member</th>
                      <th className="p-4 font-semibold">Designation & Assignment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {councilMembers.map((member) => (
                      <tr key={member.sno} className="hover:bg-muted/10 transition-colors group">
                        <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5 group-hover:bg-transparent">
                          {member.sno}
                        </td>
                        <td className="p-4 font-bold text-primary tracking-wide">
                          {member.name}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            member.sno === 1 
                              ? 'bg-gold/10 text-gold-deep border border-gold/20' 
                              : 'bg-primary/5 text-primary'
                          }`}>
                            {member.sno === 1 && <Award className="size-3" />}
                            {member.role}
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