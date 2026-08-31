import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { Landmark, GraduationCap, FileDown, HeartHandshake, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: `Scholarships & Financial Aid — ${SITE.name}` },
      { name: "description", content: `Explore available Government institutional financial aids, BC/MBC/SC/ST welfare schemes, and application portals at ${SITE.name}, Gudiyattam.` },
    ],
  }),
  component: ScholarshipsPage,
});

const availableSchemes = [
  "Scholarship offered by BC/MBC and SC/ST Welfare Department",
  "National Merit Scholarship Portal Options",
  "Scholarship for Physically Challenged Students",
  "Scholarship for Daughters and Sisters of Defence Service Personnel",
  "Government of India Scholarship for Children of Primary & Secondary School Teachers",
  "Ex-Servicemen Welfare Scholarship Provisions",
  "UGC - Post Graduate Indira Gandhi Scholarship Scheme for Single Girl Child",
  "EVR Nagammai Scholarship Scheme",
  "Farmer's Welfare Scholarship / Labour Welfare Board Schemes",
];

const downloadForms = [
  { sno: 1, title: "Scholarship Form 1 (Fresh Application)", url: "#" },
  { sno: 2, title: "Scholarship Form 2 (Renewal Application)", url: "#" },
  { sno: 3, title: "Scholarship Form 3 (Income Certificate Form)", url: "#" },
];

function ScholarshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Student Support"
        title="Scholarships & Financial Aid"
        subtitle="Access institutional resources, central and state welfare distributions, and financial support allocations designed to cultivate equal academic access."
      />

      {/* Main Core Breakdown Area */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Schemes Directory List (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 min-w-0">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-medium mb-2">
                <Landmark className="size-3.5 text-gold-deep" /> Statutory Financial Aids
              </div>
              <h2 className="text-2xl font-bold text-primary">Recognized Schemes</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                The following premium financial aids and state fee waivers are structurally available across student tracks as per statutory Government guidelines:
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-1 gap-3">
              {availableSchemes.map((scheme, index) => (
                <Reveal key={index} delay={index * 0.04}>
                  <div className="flex gap-4 p-4 border border-border bg-card rounded-xl hover:border-gold/20 transition-all group">
                    <span className="font-extrabold text-xs text-gold-deep bg-gold/5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold/10 transition-colors">
                      {index + 1}
                    </span>
                    <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                      {scheme}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: PDF Download Portal (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.1}>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <GraduationCap className="size-5 text-gold-deep" />
                  <h3 className="font-bold text-primary text-base">Application Downloads</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">S.No</th>
                        <th className="p-4 font-semibold">Form Title</th>
                        <th className="p-4 font-semibold text-center w-28">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {downloadForms.map((doc) => (
                        <tr key={doc.sno} className="hover:bg-muted/10 transition-colors group">
                          <td className="p-4 text-center font-medium text-muted-foreground">{doc.sno}</td>
                          <td className="p-4 font-semibold text-primary group-hover:text-gold-deep transition-colors text-xs leading-relaxed">
                            {doc.title}
                          </td>
                          <td className="p-4 text-center">
                            <a
                              href={doc.url}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold bg-secondary hover:bg-gold hover:text-secondary-foreground text-secondary-foreground rounded-lg transition-all border border-border shadow-sm"
                              onClick={(e) => {
                                if (doc.url === "#") {
                                  e.preventDefault();
                                  alert("This PDF application asset placeholder is empty. You can replace the '#' tag with your real server document path later!");
                                }
                              }}
                            >
                              <FileDown className="size-3.5" /> Get Form
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Verification Advisory Callout */}
            <Reveal delay={0.15}>
              <div className="p-5 border border-border bg-card rounded-2xl space-y-3 shadow-sm">
                <div className="flex gap-2 items-center text-primary font-bold text-sm">
                  <HeartHandshake className="size-4 text-gold-deep" /> Verification Support
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Students seeking application endorsements must produce completed forms alongside matching valid parent income records and community certifications for desk verification.
                </p>
                <div className="pt-2 border-t border-border flex gap-2 items-start text-[10px] text-muted-foreground leading-relaxed">
                  <ShieldAlert className="size-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Deadlines follow explicit Tamil Nadu State Welfare Board announcements. Submit profiles early to the main college administrative desk to bypass batch verification bottlenecks.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </Section>
    </>
  );
}   