import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, ExternalLink, ShieldCheck, Database, Layers, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

const getComplianceData = (id: string) => {
  const dataset: Record<string, { title: string; file: string; desc: string }> = {
    "12b-2f": {
      title: "12B & 2F Status",
      file: "ugc_12b_2f.pdf",
      desc: "Official UGC recognition documentation validating institutional compliance under relevant statutory sections.",
    },
    "naac-certificate": {
      title: "NAAC B+ Certificate",
      file: "naac_b_plus_certificate.pdf",
      desc: "Official institutional framework accreditation certificate alongside verified peer group review matrices.",
    },
    "aicte": {
      title: "AICTE Approvals",
      file: "aicte_approval.pdf",
      desc: "All India Council for Technical Education formal regulatory structural expansions and authorization logs.",
    },
    "recognition-certificates": {
      title: "Certificates of Recognition",
      file: "recognition_certificates.pdf",
      desc: "State university structural affiliations and board of higher education certification records.",
    },
  };
  return dataset[id.toLowerCase()] || null;
};

// Structured lists for SSR Files Criteria & Narrative logs
const ssrCriteriaFiles = [
  { metric: "1.3.1", title: "Criterion 1.3.1 Documentation", file: "ssr_1_3_1.pdf" },
  { metric: "2.3.1", title: "Criterion 2.3.1 Documentation", file: "ssr_2_3_1.pdf" },
  { metric: "2.5.1", title: "Criterion 2.5.1 Documentation", file: "ssr_2_5_1.pdf" },
  { metric: "2.6.1", title: "Criterion 2.6.1 Documentation", file: "ssr_2_6_1.pdf" },
  { metric: "3.2.2", title: "Criterion 3.2.2 Documentation", file: "ssr_3_2_2.pdf" },
  { metric: "4.1.1", title: "Criterion 4.1.1 Documentation", file: "ssr_4_1_1.pdf" },
  { metric: "4.3.1", title: "Criterion 4.3.1 Documentation", file: "ssr_4_3_1.pdf" },
  { metric: "4.3.2", title: "Criterion 4.3.2 Documentation", file: "ssr_4_3_2.pdf" },
  { metric: "5.4.1", title: "Criterion 5.4.1 Documentation", file: "ssr_5_4_1.pdf" },
  { metric: "6.1.1", title: "Criterion 6.1.1 Documentation", file: "ssr_6_1_1.pdf" },
  { metric: "6.3.1", title: "Criterion 6.3.1 Documentation", file: "ssr_6_3_1.pdf" },
  { metric: "6.4.1", title: "Criterion 6.4.1 Documentation", file: "ssr_6_4_1.pdf" },
  { metric: "7.1.1", title: "Criterion 7.1.1 Documentation", file: "ssr_7_1_1.pdf" },
  { metric: "7.1.4", title: "Criterion 7.1.4 Documentation", file: "ssr_7_1_4.pdf" },
];

const ssrNarrativeFiles = [
  { title: "Course Outcomes", desc: "Program specific and course level performance framework data.", file: "course_outcomes.pdf" },
  { title: "Ecosystem for Innovations", desc: "Institutional initiatives, incubation cells, and research resource creation hubs.", file: "ecosystem_for_innovations.pdf" },
  { title: "Extension Activities Consolidated", desc: "Community outreach campaigns, camp summaries, and student participation records.", file: "extension_activities_consolidated.pdf" },
  { title: "IQAC Activities", desc: "Internal Quality Assurance Cell annual workflows, feedback monitoring, and action plans.", file: "iqac_activities.pdf" },
];

export const Route = createFileRoute("/compliance/$id")({
  component: ComplianceDetailsLayout,
});

function ComplianceDetailsLayout() {
  const { id } = Route.useParams();
  const normalizedId = id.toLowerCase().trim();

  const staticDoc = getComplianceData(normalizedId);

  // -------------------------------------------------------------
  // CASE 1: NIRF DETAILS DATA DISPLAY
  // -------------------------------------------------------------
  if (normalizedId === "nirf") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <div className="bg-gradient-to-b from-primary/10 to-transparent py-12 px-4 border-b border-border/40 text-center relative">
          <div className="max-w-5xl mx-auto px-4 mb-4 text-left">
            <Link to="/compliance/nirf" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="size-3.5" /> Institutional Disclosures
            </Link>
          </div>
          <span className="text-[11px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Statutory Transparency
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
            National Institutional Ranking Framework (NIRF)
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2 leading-relaxed">
            Consolidated institutional submission portfolios, data parameters, and accountability records reported to the Ministry of Education.
          </p>
        </div>

        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Database className="size-5 text-primary" /> Verified Submission Dossiers
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Click on the validated listings below to preview or download official reports mapping our financial data tables, academic matrices, and institutional progress:
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3.5 bg-muted/40 rounded-xl border border-border/60 hover:bg-muted/80 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="size-9 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-[10px]">XLS</div>
                    <div>
                      <span className="font-bold text-xs block text-foreground group-hover:text-primary transition-colors">NIRF Details Spreadsheet</span>
                      <span className="text-[10px] text-muted-foreground block">Raw operational, structural, and infrastructural data matrix.</span>
                    </div>
                  </div>
                  <a href="/assets/docs/naac/nirf_details.xls" download className="p-2 bg-background border rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                    <Download className="size-4" />
                  </a>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-muted/40 rounded-xl border border-border/60 hover:bg-muted/80 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="size-9 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center"><FileText className="size-4" /></div>
                    <div>
                      <span className="font-bold text-xs block text-foreground group-hover:text-primary transition-colors">NIRF 2022 PDF Details</span>
                      <span className="text-[10px] text-muted-foreground block">Validated discipline parameters and verified faculty details report.</span>
                    </div>
                  </div>
                  <a href="/assets/docs/naac/nirf_2022_details.pdf" target="_blank" rel="noopener noreferrer" className="p-2 bg-background border rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink className="size-4" />
                  </a>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-muted/40 rounded-xl border border-border/60 hover:bg-muted/80 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="size-9 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center"><FileText className="size-4" /></div>
                    <div>
                      <span className="font-bold text-xs block text-foreground group-hover:text-primary transition-colors">NIRF 2022 Overall Detail Metrics</span>
                      <span className="text-[10px] text-muted-foreground block">Comprehensive institutional summary data and ranking profiles.</span>
                    </div>
                  </div>
                  <a href="/assets/docs/naac/nirf_2022_overall_detail.pdf" target="_blank" rel="noopener noreferrer" className="p-2 bg-background border rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-border bg-card p-5 rounded-2xl shadow-sm space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">Nodal Desk Validation</span>
              <p className="text-[11px] text-muted-foreground leading-relaxed border-t pt-3">
                All uploaded datasets reflect official submissions verified by the institutional nodal desk before portal locking.
              </p>
              <div className="bg-emerald-500/5 text-emerald-600 border border-emerald-500/20 p-3 rounded-xl text-[10px] font-medium flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-500" /> Ministry Audited Profile
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CASE 2: FILES REQUIRED FOR SSR
  // -------------------------------------------------------------
  if (normalizedId === "ssr-files") {
    return (
      <div className="min-h-screen bg-background text-foreground pb-16">
        <div className="bg-gradient-to-b from-primary/10 to-transparent py-12 px-4 border-b border-border/40 text-center relative">
          <div className="max-w-5xl mx-auto px-4 mb-4 text-left">
            <Link to="/compliance/nirf" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="size-3.5" /> Institutional Disclosures
            </Link>
          </div>
          <span className="text-[11px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Self-Study Report Compilation
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">Files Required for SSR</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2 leading-relaxed">
            Quick-access indices for mandatory qualitative metrics, key indicators, and institutional evaluation profiles.
          </p>
        </div>

        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Grid Layout containing the Metrics Split */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Part A: Criterion Key Metrics Index */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Layers className="size-4.5 text-primary" /> Key Criterion Metrics (.pdf)
              </h2>
              <div className="grid gap-2.5 sm:grid-cols-2 pt-1">
                {ssrCriteriaFiles.map((item) => (
                  <div key={item.metric} className="flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/60 transition-colors border rounded-xl group">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="px-2 py-1 bg-primary/10 text-primary rounded-md font-mono text-[10px] font-bold">
                        {item.metric}
                      </div>
                      <span className="font-semibold text-xs text-foreground truncate block">
                        Metric {item.metric}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a 
                        href={`/assets/docs/naac/${item.file}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 bg-background border hover:text-primary transition-colors rounded-md"
                        title="View PDF"
                      >
                        <ExternalLink className="size-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part B: Institutional Extended Descriptors */}
            <div className="border border-border bg-card p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <FileText className="size-4.5 text-primary" /> Consolidated Narrative Portfolios (.pdf)
              </h2>
              <div className="space-y-3">
                {ssrNarrativeFiles.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-muted/40 border rounded-xl hover:bg-muted/70 transition-all group">
                    <div className="space-y-0.5 pr-4">
                      <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                    <a 
                      href={`/assets/docs/naac/${item.file}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-background border rounded-lg text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar validation info */}
          <div className="space-y-6">
            <div className="border border-border bg-card p-5 rounded-2xl shadow-sm space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block">IQAC Framework</span>
                <h3 className="text-xs font-bold text-foreground mt-0.5">SSR Reference Files</h3>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed border-t pt-3">
                These compliance links provide supporting records mapped directly into our comprehensive institutional SSR submission template dashboard.
              </p>
              <div className="bg-emerald-500/5 text-emerald-600 border border-emerald-500/20 p-3 rounded-xl text-[10px] font-medium flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-500" /> QA Verified Assets
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CASE 3: DYNAMIC ASSISTANCE FOR RENDERED STATIC PDF FILES
  // -------------------------------------------------------------
  if (staticDoc) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-12 flex flex-col items-center justify-center p-4">
        <div className="max-w-xl w-full border border-border bg-card p-8 rounded-2xl shadow-sm text-center space-y-6">
          <div className="size-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
            <FileText className="size-7" />
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary/70 block">Institutional Disclosure Document</span>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{staticDoc.title}</h1>
            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">{staticDoc.desc}</p>
          </div>

          <div className="bg-muted/40 border p-4 rounded-xl flex items-center justify-between text-left gap-4">
            <div className="truncate">
              <span className="text-[9px] text-muted-foreground block uppercase font-bold">Resource System Path</span>
              <span className="text-xs font-mono text-foreground/80 truncate block">/assets/docs/naac/{staticDoc.file}</span>
            </div>
            <div className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-medium shrink-0">
              Verified Source
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 pt-2">
            <a 
              href={`/assets/docs/naac/${staticDoc.file}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-primary text-primary-foreground font-bold text-xs py-3 rounded-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
            >
              <ExternalLink className="size-3.5" /> View in New Tab
            </a>
            <a 
              href={`/assets/docs/naac/${staticDoc.file}`} 
              download
              className="w-full bg-muted text-foreground border font-bold text-xs py-3 rounded-xl hover:bg-muted/80 transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="size-3.5" /> Download Document
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6 bg-background">
      <p className="text-xs text-muted-foreground">Unknown regulatory parameter endpoint node.</p>
    </div>
  );
}