import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { Calendar, FileDown, Info, CalendarDays, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/calender")({
  head: () => ({
    meta: [
      { title: `Academic Calendar — ${SITE.name}` },
      { name: "description", content: `Access and download official academic calendars, session schedules, and term documents for ${SITE.name}, Gudiyattam.` },
    ],
  }),
  component: CalendarPage,
});

// Easily update 'downloadUrl' with your actual PDF links later
const calendarDocuments = [
  { sno: 1, title: "Academic Calendar 2021–22", type: "PDF Document", size: "Under Review", downloadUrl: "#" },
  { sno: 2, title: "Academic Calendar 2020–21", type: "PDF Document", size: "Under Review", downloadUrl: "#" },
  { sno: 3, title: "Academic Calendar 2019–20", type: "PDF Document", size: "Under Review", downloadUrl: "#" },
  { sno: 4, title: "Academic Calendar 2018–19", type: "PDF Document", size: "Under Review", downloadUrl: "#" },
  { sno: 5, title: "Academic Calendar 2017–18", type: "PDF Document", size: "Under Review", downloadUrl: "#" },
];

function CalendarPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Academic Calendar Archive"
        subtitle="View or download official institutional schedules, term structures, and academic timelines organized by academic year."
      />

      <Section>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Table Area (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            <Reveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                  <CalendarDays className="size-5 text-gold-deep" />
                  <h2 className="font-bold text-primary text-lg">Available Schedules</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">S.No</th>
                        <th className="p-4 font-semibold">Calendar Schedule Title</th>
                        <th className="p-4 font-semibold">Format</th>
                        <th className="p-4 font-semibold text-center w-32">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {calendarDocuments.map((doc) => (
                        <tr key={doc.sno} className="hover:bg-muted/20 transition-colors group">
                          <td className="p-4 text-center font-medium text-muted-foreground">{doc.sno}</td>
                          <td className="p-4 font-semibold text-primary group-hover:text-gold-deep transition-colors">
                            {doc.title}
                          </td>
                          <td className="p-4 text-xs text-muted-foreground">
                            <span className="px-2 py-1 rounded bg-red-500/10 text-red-600 font-medium dark:text-red-400">
                              PDF
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <a
                              href={doc.downloadUrl}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-secondary hover:bg-gold hover:text-secondary-foreground text-secondary-foreground rounded-lg transition-all border border-border shadow-sm group-hover:border-gold/30"
                              onClick={(e) => {
                                if (doc.downloadUrl === "#") {
                                  e.preventDefault();
                                  alert("This PDF file reference placeholder is empty. You can replace the '#' with your asset folder link later!");
                                }
                              }}
                            >
                              <FileDown className="size-3.5" /> Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Informational Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <Reveal delay={0.1}>
              <div className="p-6 border border-border rounded-2xl bg-card space-y-4 shadow-sm">
                <div className="flex gap-3 items-start">
                  <Info className="size-5 text-gold-deep shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Note to Students</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Academic calendars provide foundational term boundaries, tentative exam slots, and public holidays mandated by Thiruvalluvar University.
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-border text-[11px] text-muted-foreground leading-relaxed">
                  For active, real-time schedule adjustments or immediate exam tracking notices, please keep an eye on the regular announcements under our <strong>News & Events</strong> portal sections.
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-5 border border-amber-500/10 rounded-2xl bg-amber-500/5 flex gap-3 items-start">
                <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-amber-800 dark:text-amber-400 text-xs uppercase tracking-wider">Administrative Notice</h5>
                  <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-1 leading-relaxed">
                    Schedules for recent academic periods (2023 onwards) are undergoing updates via the administrative desk and will automatically appear here once verified.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </Section>
    </>
  );
}