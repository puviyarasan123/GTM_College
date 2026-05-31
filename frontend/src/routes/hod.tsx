import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { UserCheck, GraduationCap, Mail, Medal, Award } from "lucide-react";

export const Route = createFileRoute("/hod")({
  head: () => ({
    meta: [
      { title: `Heads of Departments (HODs) — ${SITE.name}` },
      { name: "description", content: `Meet the academic leadership team and Heads of Departments (HODs) guiding various disciplines at ${SITE.name}, Gudiyattam.` },
    ],
  }),
  component: HodPage,
});

const hodRegistry = [
  { name: "Dr. A. Sridhar", role: "Head of the Department", dept: "English", status: "In-charge (I/C)", isAcademic: true },
  { name: "Dr. D. Ramasamy", role: "Head of the Department", dept: "Zoology", status: "Regular", isAcademic: true },
  { name: "Dr. S. KARUNANITHI", role: "Head of the Department", dept: "Mathematics", status: "Regular", isAcademic: true },
  { name: "Dr. A. THAMARAI", role: "Head of the Department", dept: "Physics", status: "Regular", isAcademic: true },
  { name: "Dr. A. Thamim Ansari", role: "Head of the Department", dept: "Chemistry", status: "Regular", isAcademic: true },
  { name: "Dr. K. ARULANANDAM", role: "Head of the Department", dept: "Computer Applications (BCA)", status: "Regular", isAcademic: true },
  { name: "Dr. P. Karthikeyan", role: "Head of the Department", dept: "Commerce", status: "Regular", isAcademic: true },
  { name: "Dr. K. VIJAYARANGAM", role: "Head of the Department", dept: "History", status: "Regular", isAcademic: true },
  { name: "Prof. S. KARPAGAM", role: "Head of the Department", dept: "Economics", status: "Regular", isAcademic: true },
  { name: "Dr. M.G. LOGANATHAN", role: "Head of the Department", dept: "Business Administration (BBA)", status: "Regular", isAcademic: true },
  { name: "Dr. M. Kalpana", role: "Head of the Department", dept: "Tamil", status: "Regular", isAcademic: true },
  { name: "Dr. Sujatha", role: "Head of the Department", dept: "Botany", status: "In-charge (I/C)", isAcademic: true },
  { name: "Dr. K. ARULANANDAM", role: "Head of the Department", dept: "Computer Science", status: "In-charge (I/C)", isAcademic: true },
  { name: "Dr. Chakravarthy", role: "Physical Director", dept: "Physical Education", status: "Regular", isAcademic: false },
];

function HodPage() {
  return (
    <>
      <PageHero
        eyebrow="Academic Leadership"
        title="Heads of Departments"
        subtitle="Meet our departmental leaders responsible for nurturing scholastic environments, steering curriculum directives, and anchoring faculty excellence."
      />

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hodRegistry.map((hod, index) => {
            const IsInCharge = hod.status.includes("I/C");
            
            return (
              <Reveal key={hod.dept + index} delay={(index % 3) * 0.05}>
                <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden group hover:shadow-elegant hover:border-gold/30 transition-all duration-300">
                  
                  {/* Status Badge Ribbon */}
                  {IsInCharge && (
                    <div className="absolute top-0 right-0 bg-gold/10 text-gold-deep border-b border-l border-gold/20 text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase">
                      In-Charge
                    </div>
                  )}

                  <div>
                    {/* Dynamic Header Badge Tag based on field type */}
                    <div className={`inline-flex items-center gap-1 text-xs font-bold tracking-wide uppercase mb-4 px-2.5 py-1 rounded-md ${
                      hod.isAcademic 
                        ? 'text-gold-deep bg-gold/5' 
                        : 'text-primary bg-primary/5'
                    }`}>
                      {hod.isAcademic ? <GraduationCap className="size-3.5" /> : <Medal className="size-3.5" />}
                      {hod.isAcademic ? `Department of ${hod.dept}` : hod.dept}
                    </div>

                    {/* Member Profile Label */}
                    <h3 className="text-lg font-bold text-primary tracking-wide leading-snug group-hover:text-gold-deep transition-colors duration-200">
                      {hod.name}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground font-medium mt-1 flex items-center gap-1.5">
                      <UserCheck className="size-3.5 text-muted-foreground" /> {hod.role}
                    </p>
                  </div>

                  {/* Operational Action Row */}
                  <div className="mt-6 pt-4 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 hover:text-gold-deep transition-colors cursor-pointer">
                      <Mail className="size-3.5" /> Contact
                    </div>
                    <div className="w-1 h-1 bg-border rounded-full" />
                    <div className="text-[11px] font-medium bg-muted px-2 py-0.5 rounded text-muted-foreground">
                      {hod.isAcademic ? "Faculty Executive" : "Campus Director"}
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}