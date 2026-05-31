import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { Clock, Briefcase, Users, Landmark, Award } from "lucide-react";

export const Route = createFileRoute("/office")({
  head: () => ({
    meta: [
      { title: `College Office Administration — ${SITE.name}` },
      { name: "description", content: `Administrative and financial support desk at ${SITE.name}, operating under the guidance of the Bursar and Superintendent.` },
    ],
  }),
  component: CollegeOfficePage,
});

const officeStaff = [
  { sno: 1, name: "Mr. Nepolian", designation: "Bursar", tier: "leadership" },
  { sno: 2, name: "Mr. Kumar", designation: "Superintendent", tier: "leadership" },
  { sno: 3, name: "Sugashini, M.A.(His)., M.A.(Hin)., M.A.(Sans).", designation: "Junior Assistant", tier: "staff" },
  { sno: 4, name: "Mrs. Usharani", designation: "Assistant", tier: "staff" },
  { sno: 5, name: "Mr. Jayaprakash", designation: "Assistant", tier: "staff" },
  { sno: 6, name: "Kumaraesan, M.Sc.", designation: "Assistant", tier: "staff" },
  { sno: 7, name: "Mr. Captain Prabhakar", designation: "Assistant", tier: "staff" },
  { sno: 8, name: "Mr. Suresh", designation: "Assistant", tier: "staff" },
  { sno: 9, name: "Mr. Mohan", designation: "Assistant", tier: "staff" },
  { sno: 10, name: "Mr. Anbarasan", designation: "Assistant", tier: "staff" },
];

function CollegeOfficePage() {
  return (
    <>
      <PageHero
        eyebrow="Administration"
        title="College Office"
        subtitle="The operational spine of the institution handling financial logs, academic registries, non-teaching logistics, and day-to-day administrative assistance."
      />

      {/* Leadership & Timings Section */}
      <Section className="pb-0">
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal delay={0.05}>
            <div className="bg-card border border-border p-6 rounded-2xl h-full flex gap-4 items-start shadow-sm">
              <div className="p-3 rounded-xl bg-gold/10 text-gold-deep shrink-0">
                <Clock className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-lg">Office Hours</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Open Monday through Friday<br />
                  <span className="font-semibold text-foreground">10:00 AM – 5:45 PM</span>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-card border border-border p-6 rounded-2xl h-full flex gap-4 items-start shadow-sm">
              <div className="p-3 rounded-xl bg-gold/10 text-gold-deep shrink-0">
                <Landmark className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-lg">The Bursar</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  In charge of the financial proceedings of the college and directly oversees the core office administration framework.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-card border border-border p-6 rounded-2xl h-full flex gap-4 items-start shadow-sm">
              <div className="p-3 rounded-xl bg-gold/10 text-gold-deep shrink-0">
                <Briefcase className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-lg">The Superintendent</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Directly in-charge of executing assignments for non-teaching, ministerial, technical, and auxiliary support staff profiles.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Roster Table Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
              <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                <Users className="size-5 text-gold-deep" />
                <h2 className="font-bold text-primary text-base">Office Administration Roster</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                      <th className="p-4 font-semibold w-20 text-center">S.No</th>
                      <th className="p-4 font-semibold">Name of the Office Staff</th>
                      <th className="p-4 font-semibold">Designation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {officeStaff.map((staff) => (
                      <tr key={staff.sno} className="hover:bg-muted/10 transition-colors group">
                        <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5 group-hover:bg-transparent">
                          {staff.sno}
                        </td>
                        <td className="p-4 font-bold text-primary tracking-wide">
                          {staff.name}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            staff.tier === "leadership"
                              ? 'bg-gold/10 text-gold-deep border border-gold/20 uppercase tracking-wider text-[10px]' 
                              : 'bg-primary/5 text-primary'
                          }`}>
                            {staff.tier === "leadership" && <Award className="size-3" />}
                            {staff.designation}
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