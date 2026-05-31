import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { 
  Users, 
  ShieldCheck, 
  ArrowLeft, 
  GraduationCap, 
  Building2, 
  FileSpreadsheet, 
  FileText, 
  CloudLightning, 
  FolderSync 
} from "lucide-react";

// Reusable UI Layout components
const PageHero = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
  <div className="bg-primary text-primary-foreground py-16 px-6 border-b border-border bg-gradient-to-br from-primary via-primary to-primary/90">
    <div className="max-w-5xl mx-auto space-y-3">
      <span className="text-xs uppercase tracking-widest font-bold text-gold-deep bg-primary-foreground/10 px-3 py-1 rounded-full">{eyebrow}</span>
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
      <p className="text-sm md:text-base max-w-2xl text-primary-foreground/80 leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-12 px-4 md:px-8 max-w-5xl mx-auto ${className}`}>{children}</section>
);

// 1. REGISTER THE ROUTE WITH TANSTACK ROUTER
export const Route = createFileRoute("/iqac/$tabId")({
  component: IqacDynamicPage,
});

function IqacDynamicPage() {
  // 2. USE TANSTACK'S HOOK FOR DYNAMIC PARAMS
  const { tabId } = useParams({ from: "/iqac/$tabId" });
  const normalizedId = tabId?.toLowerCase();

  const tabLabelMap: Record<string, string> = {
    "activities": "IQAC Activities Report",
    "best-practices": "Institutional Best Practices",
    "institutional-distinctiveness": "Institutional Distinctiveness Statement",
    "program-outcomes": "Expected Program & Course Outcomes",
    "sss-report": "Student Satisfaction Survey (SSS) Report 2021-22",
    "aicte-eoa": "AICTE Extension of Approval (EOA) 2021-22",
    "minutes": "Minutes of IQAC Statutory Meetings",
    "future-plan": "Strategic Future Developmental Plan",
    "rti-pdf": "Right to Information (RTI) Core Dossier",
    "rti-act-new": "RTI Act-2005 Statutory Framework Updates",
  };

  // ------------------------------------------
  // VIEW A: IQAC TEAM
  // ------------------------------------------
  if (normalizedId === "team") {
    const coordinator = {
      name: "Dr. A. Sridhar",
      dept: "Department of Mathematics",
      role: "IQAC Coordinator",
    };

    const members = [
      { sno: 1, name: "Dr. G. Ramasamy", designation: "Assistant Professor", dept: "Department of Chemistry" },
      { sno: 4, name: "Dr. D. Ramasamy", designation: "Assistant Professor", dept: "Department of Chemistry" },
      { sno: 9, name: "Dr. S. Senthil Kumar", designation: "Assistant Professor", dept: "Department of Mathematics" },
    ];

    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero
          eyebrow="Internal Quality Assurance Cell"
          title="IQAC Committee Team"
          subtitle="The governing administrative cell driving institutional benchmarks, academic audits, and strategic deployment frameworks."
        />

        <Section>
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-wider font-bold text-muted-foreground border-b pb-2 flex items-center gap-2">
                <GraduationCap className="size-4 text-gold-deep" /> Executive Coordinator
              </h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-primary/20 bg-primary/5 p-6 rounded-2xl shadow-sm flex items-start gap-4 relative overflow-hidden group">
                  <div className="absolute right-0 top-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 uppercase tracking-wide rounded-bl-xl shadow-sm">
                    Chairperson
                  </div>
                  <div className="p-3 bg-primary text-primary-foreground rounded-xl shrink-0 shadow-md">
                    <Users className="size-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-primary">{coordinator.name}</h3>
                    <p className="text-xs font-bold text-gold-deep tracking-wide uppercase">{coordinator.role}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1.5">
                      <Building2 className="size-3.5" />
                      <span>{coordinator.dept}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-wider font-bold text-muted-foreground border-b pb-2 flex items-center gap-2">
                <Users className="size-4 text-gold-deep" /> Operational Committee Members
              </h2>
              <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">S.No</th>
                        <th className="p-4 font-semibold">Name of the Staff</th>
                        <th className="p-4 font-semibold">Designation</th>
                        <th className="p-4 font-semibold">Department Assignments</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {members.map((member) => (
                        <tr key={member.sno} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5 w-16">
                            {member.sno}
                          </td>
                          <td className="p-4 font-bold text-primary">{member.name}</td>
                          <td className="p-4 text-xs font-semibold text-muted-foreground">
                            <span className="border bg-background px-2 py-0.5 rounded-md shadow-sm">
                              {member.designation}
                            </span>
                          </td>
                          <td className="p-4 text-xs font-medium text-foreground/80">
                            <div className="flex items-center gap-1.5">
                              <Building2 className="size-3.5 text-muted-foreground" />
                              {member.dept}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    );
  }

  // ------------------------------------------
  // VIEW B: NIRF INFORMATION 2022
  // ------------------------------------------
  if (normalizedId === "nirf-2022") {
    const nirfDownloads = [
      { name: "NIRF Details Spreadsheet", type: "XLS", size: "Data Ledger", path: "/assets/documents/nirf_details.xls", isExcel: true },
      { name: "NIRF 2022 PDF Details Report", type: "PDF", size: "Verified Document", path: "/assets/pdf/nirf_2022_details.pdf", isExcel: false },
      { name: "NIRF 2022 Overall Breakdown Summary", type: "PDF", size: "Comprehensive Matrix", path: "/assets/pdf/nirf_2022_overall.pdf", isExcel: false },
    ];

    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero
          eyebrow="National Institutional Ranking Framework"
          title="NIRF Information 2022"
          subtitle="Institutional status metrics, parameter scores, and statutory validation documents submitted for the 2022 national ranking system cycle."
        />

        <Section>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-primary border-b pb-3">
                <ShieldCheck className="size-5 text-gold-deep" />
                <h2 className="font-bold text-base">NIRF 2022 Institutional Data Repositories</h2>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Review verified parameter calculations, student/faculty structural summaries, and overall statutory reporting configurations sent to the Ministry of Education for the NIRF 2022 submission portal.
              </p>

              <div className="grid gap-3 pt-2">
                {nirfDownloads.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/50 transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-lg border ${
                        doc.isExcel 
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                          : "bg-red-500/10 text-red-600 border-red-500/20"
                      }`}>
                        {doc.isExcel ? <FileSpreadsheet className="size-5" /> : <FileText className="size-5" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-primary group-hover:underline">{doc.name}</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{doc.size}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${
                      doc.isExcel 
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-700" 
                        : "bg-red-500/15 border-red-500/30 text-red-700"
                    }`}>
                      {doc.type}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    );
  }

  // ------------------------------------------
  // VIEW C: PLACEHOLDERS FOR UNUPLOADED PDFs
  // ------------------------------------------
  if (normalizedId && Object.keys(tabLabelMap).includes(normalizedId)) {
    const contextTitle = tabLabelMap[normalizedId];

    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero
          eyebrow="IQAC Document Vault"
          title={contextTitle}
          subtitle={`Statutory governance record ledger for the Internal Quality Assurance Cell framework.`}
        />

        <Section>
          <div className="border border-border bg-card p-8 rounded-2xl shadow-sm text-center space-y-5 max-w-xl mx-auto my-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-gold-deep to-primary" />
            <div className="mx-auto size-14 bg-amber-500/10 text-amber-600 flex items-center justify-center rounded-2xl border border-amber-500/20 shadow-inner">
              <FolderSync className="size-6 text-gold-deep" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-extrabold text-primary">Document Archive Syncing</h2>
              <p className="text-xs text-muted-foreground leading-relaxed px-2">
                The structured data verification node and corresponding PDF document for <span className="font-bold text-foreground font-mono bg-muted px-1.5 py-0.5 rounded border">{contextTitle}</span> are currently being synchronized by the administration desk.
              </p>
            </div>
            <div className="bg-muted/40 border border-border/60 p-4 rounded-xl text-left text-[11px] text-muted-foreground leading-normal flex gap-2.5 items-start">
              <CloudLightning className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Once administrative audits are verified, the physical asset will open directly via your navigation menu interface.</span>
            </div>
            <div className="pt-2 border-t border-border/60 flex items-center justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline group"
              >
                <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
                Return to Institutional Dashboard
              </Link>
            </div>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-6">
      <h1 className="text-lg font-bold text-primary mb-1">IQAC Configuration Matrix Not Linked</h1>
      <p className="text-xs text-muted-foreground mb-4">The path parameters do not exist in the routing maps.</p>
      <Link to="/" className="text-xs font-bold text-primary underline">Return to Homepage</Link>
    </div>
  );
}