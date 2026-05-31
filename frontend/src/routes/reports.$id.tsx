import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, ExternalLink, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Helper mapper transforming route parameters into human-readable details
const getReportMetadata = (id: string) => {
  const normalized = id.toLowerCase().trim();
  
  // Clean titles mapped from image_7c52fa.png
  const titles: Record<string, string> = {
    "ncc-report-1": "NCC Report - Part 1",
    "ncc-report-2": "NCC Report - Part 2",
    "ncc-report-3": "NCC Report - Part 3",
    "ncc-report-4": "NCC Report - Part 4",
    "nss-report": "National Service Scheme (NSS) Annual Report",
    "iqac-report-1": "IQAC Quality Performance Report 1",
    "iqac-report-2": "IQAC Quality Performance Report 2",
    "iqac-report-3": "IQAC Quality Performance Report 3",
    "iqac-report-4": "IQAC Quality Performance Report 4",
    "placement-report-1": "Placement Cell Records - Dossier 1",
    "placement-report-2": "Placement Cell Records - Dossier 2",
    "placement-report-3": "Placement Cell Records - Dossier 3",
    "rrc-reports": "Red Ribbon Club (RRC) Activity Report",
    "sports-report-1": "Institutional Athletic Profile - Report 1",
    "sports-report-2": "Institutional Athletic Profile - Report 2",
    "sports-report-3": "Institutional Athletic Profile - Report 3",
    "sports-report-4": "Institutional Athletic Profile - Report 4",
    "sports-report-5": "Institutional Athletic Profile - Report 5",
    "yrc-report": "Youth Red Cross (YRC) Humanitarian Activity Log",
  };

  const baseTitle = titles[normalized] || "Institutional Activity Report";
  
  // Format matching structural file names (e.g., ncc_report_1.pdf)
  const fileName = normalized.replace(/-/g, "_") + ".pdf";

  return {
    title: baseTitle,
    file: fileName,
  };
};

export const Route = createFileRoute("/reports/$id")({
  component: ReportsDynamicLayout,
});

function ReportsDynamicLayout() {
  const { id } = Route.useParams();
  const report = getReportMetadata(id);

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full border border-border bg-card p-8 rounded-2xl shadow-sm text-center space-y-6">
        
        {/* Document Frame Icon */}
        <div className="size-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
          <FileText className="size-7" />
        </div>
        
        {/* Header Strings */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary/70 block">
            Academic & Extension Audits
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            {report.title}
          </h1>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            Official compilation file documenting verified event data summaries, student rosters, and administrative approvals.
          </p>
        </div>

        {/* Verification Subcard */}
        <div className="bg-muted/40 border border-border/60 p-4 rounded-xl flex items-center justify-between text-left gap-4">
          <div className="truncate">
            <span className="text-[9px] text-muted-foreground block uppercase font-bold">Document Resource Path</span>
            <span className="text-xs font-mono text-foreground/80 truncate block">
              /assets/docs/reports/{report.file}
            </span>
          </div>
          <div className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-medium shrink-0 flex items-center gap-1">
            <ShieldCheck className="size-3" /> Signed Copy
          </div>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="grid gap-2 sm:grid-cols-2 pt-2">
          <a 
            href={`/assets/docs/reports/${report.file}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-primary text-primary-foreground font-bold text-xs py-3 rounded-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ExternalLink className="size-3.5" /> View Report PDF
          </a>
          <a 
            href={`/assets/docs/reports/${report.file}`} 
            download
            className="w-full bg-muted text-foreground border font-bold text-xs py-3 rounded-xl hover:bg-muted/80 transition-colors flex items-center justify-center gap-1.5"
          >
            <Download className="size-3.5" /> Download Archive
          </a>
        </div>

        {/* Back Navigation Footer Links */}
        <div className="border-t border-border/60 pt-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
          >
            <ArrowLeft className="size-3.5" /> Return to Main Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}