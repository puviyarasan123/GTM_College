// import { createFileRoute } from "@tanstack/react-router";
// import { PageHero, Section, SectionHeader, Reveal } from "@/components/site/PageShell";
// import { SITE } from "@/lib/site-data";
// import { BookOpen, Database, Wifi, Clock } from "lucide-react";
// import libImg from "@/assets/hero-library.jpg";

// export const Route = createFileRoute("/library")({
//   head: () => ({
//     meta: [
//       { title: `Library & Knowledge Centre — ${SITE.name}` },
//       { name: "description", content: "1.2 lakh volumes, 40+ digital databases, open 24/7." },
//       { property: "og:url", content: "/library" },
//     ],
//     links: [{ rel: "canonical", href: "/library" }],
//   }),
//   component: () => (
//     <>
//       <PageHero eyebrow="Knowledge Centre" title="A library that never closes." subtitle="120,000 print volumes, 40+ research databases, silent zones, group studios and a 24/7 reading commons." />
//       <Section>
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <Reveal>
//             <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant">
//               <img src={libImg} alt="Central library reading hall" className="size-full object-cover" />
//             </div>
//           </Reveal>
//           <Reveal delay={0.1}>
//             <SectionHeader eyebrow="The collection" title="Where research begins" />
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { icon: BookOpen, k: "1,20,000+", v: "Print volumes" },
//                 { icon: Database, k: "40+", v: "Digital databases" },
//                 { icon: Wifi, k: "Gigabit", v: "Campus-wide Wi-Fi" },
//                 { icon: Clock, k: "24 / 7", v: "Reading commons" },
//               ].map((s) => (
//                 <div key={s.v} className="rounded-2xl border border-border p-5">
//                   <s.icon className="size-5 text-gold-deep mb-3" />
//                   <div className="text-2xl font-extrabold text-primary">{s.k}</div>
//                   <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.v}</div>
//                 </div>
//               ))}
//             </div>
//           </Reveal>
//         </div>
//       </Section>
//     </>
//   ),
// });

import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { 
  Clock, 
  BookOpen, 
  Users, 
  CalendarDays, 
  AlertCircle, 
  Computer, 
  UserCheck,
  FileText
} from "lucide-react";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: `Library & Information Centre — ${SITE.name}` },
      { name: "description", content: `Library guidelines, opening hours, borrowing schedules, and digital facilities at ${SITE.name}, Gudiyattam.` },
    ],
  }),
  component: LibraryPage,
});

const schedule = [
  { day: "Tuesday", level: "UG Second Year", books: "1 Book" },
  { day: "Wednesday", level: "UG Third Year", books: "1 Book" },
  { day: "Thursday", level: "PG Students", books: "2 Books" },
  { day: "Friday", level: "UG First Year", books: "1 Book" },
];

function LibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="Learning Resources"
        title="Library & Information Centre"
        subtitle="A knowledge hub supporting academic excellence with an extensive collection of books, departmental resources, and upcoming digital management integrations."
      />

      {/* Quick Overview Cards */}
      <Section className="pb-0">
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal delay={0.05}>
            <div className="bg-card border border-border p-6 rounded-2xl h-full flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-gold/10 text-gold-deep shrink-0">
                <Clock className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-lg">Opening Hours</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Open on all working days<br />
                  <span className="font-semibold text-foreground">9:30 AM – 4:30 PM</span>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-card border border-border p-6 rounded-2xl h-full flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-gold/10 text-gold-deep shrink-0">
                <BookOpen className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-lg">Library Structure</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Features a centralized General Library along with dedicated library resources maintained within each individual department.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-card border border-border p-6 rounded-2xl h-full flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-gold/10 text-gold-deep shrink-0">
                <UserCheck className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-lg">Librarian In-charge</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  <span className="font-semibold text-foreground block">Mr. S. SENTHILKUMAR</span>
                  Assistant Professor,<br />Department of Mathematics
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Main Rules and Schedule Grid */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Borrowing Schedule Table */}
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-medium mb-2">
                <CalendarDays className="size-3.5 text-gold-deep" /> Weekly Borrowing Slots
              </div>
              <h2 className="text-2xl font-bold text-primary">Issue Schedule</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                To ensure a systematic distribution process, specific card issuance and borrowing actions are designated to specific days:
              </p>

              <div className="border border-border rounded-xl overflow-hidden mt-4 bg-card shadow-sm">
                {/* Narrow screens scroll the table instead of clipping it. */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold">Day</th>
                        <th className="p-4 font-semibold">Eligible Students</th>
                        <th className="p-4 font-semibold text-right">Quota</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {schedule.map((item) => (
                        <tr key={item.day} className="hover:bg-muted/30 transition-colors">
                          <td className="p-4 font-semibold text-gold-deep">{item.day}</td>
                          <td className="p-4 text-foreground font-medium">{item.level}</td>
                          <td className="p-4 text-right text-muted-foreground font-medium">{item.books}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            {/* Automation Status Callout */}
            <Reveal>
              <div className="p-4 rounded-xl border border-gold/20 bg-gold/5 flex gap-3 items-center">
                <Computer className="size-5 text-gold-deep shrink-0" />
                <p className="text-xs text-gold-deep font-medium leading-relaxed">
                  <strong>Digitalization Update:</strong> Implementation of the advanced <em>Autolib</em> Library Automation Software process is currently underway to streamline indexing and transactions.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Library Guidelines Cards */}
          <div className="lg:col-span-7 space-y-6 min-w-0">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-medium mb-2">
                <AlertCircle className="size-3.5 text-gold-deep" /> Terms & Regulations
              </div>
              <h2 className="text-2xl font-bold text-primary">Rules & Borrowing Guidelines</h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4">
              <Reveal delay={0.05}>
                <div className="p-5 border border-border rounded-xl bg-card">
                  <div className="text-xs font-bold text-primary tracking-wider uppercase mb-1">Eligibility</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The Library and its facilities are fully accessible to all enrolled students and working staff members of the college.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="p-5 border border-border rounded-xl bg-card">
                  <div className="text-xs font-bold text-primary tracking-wider uppercase mb-1">Reference Restrictions</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Except for designated restricted Reference Books, all general volumes and texts can be borrowed for home study.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="p-5 border border-border rounded-xl bg-card">
                  <div className="text-xs font-bold text-primary tracking-wider uppercase mb-1">Book Renewals</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Books can be renewed to extend their return due dates, provided there are no active waiting list demands or reserves for that volume.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="p-5 border border-border rounded-xl bg-card">
                  <div className="text-xs font-bold text-primary tracking-wider uppercase mb-1">Overdue Fine System</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If borrowed materials are not returned on or before the given due date, an administrative fine of <span className="font-semibold text-foreground">Re. 1/- per working day</span> will be systematically charged.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Full-width Guidelines Callout Box */}
            <Reveal delay={0.25}>
              <div className="p-6 border border-border rounded-xl bg-card space-y-4">
                <div className="flex gap-3 items-start">
                  <FileText className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Semester & Curricular Textbook Policies</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      Syllabus textbooks must be checked out and received through their respective academic departments. Students are strictly permitted to borrow books prescribed specifically for their active curriculum semester.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex gap-3 items-start text-xs text-muted-foreground leading-relaxed">
                  <span className="text-red-500 font-bold">Important Note:</span>
                  <span>
                    Students bear full legal and financial responsibility for the physical condition of all books borrowed under their profile. All volumes must be safely returned completely undamaged at the conclusion of each academic semester.
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