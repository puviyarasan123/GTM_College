import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CloudLightning, FolderSync } from "lucide-react";

const PageHero = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
  <div className="bg-primary text-primary-foreground py-16 px-6 border-b border-border bg-gradient-to-br from-primary via-primary to-primary/90">
    <div className="max-w-5xl mx-auto space-y-3">
      <span className="text-xs uppercase tracking-widest font-bold text-gold-deep bg-primary-foreground/10 px-3 py-1 rounded-full">{eyebrow}</span>
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
      <p className="text-sm md:text-base max-w-2xl text-primary-foreground/80 leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

// REGISTER THE NEW standalone "/aqar/$tabId" path routing node
export const Route = createFileRoute("/aqar/$tabId")({
  component: AqarDynamicPage,
});

function AqarDynamicPage() {
  const { tabId } = useParams({ from: "/aqar/$tabId" });
  const normalizedId = tabId?.toLowerCase();

  const aqarLabelMap: Record<string, string> = {
    "aqar-2017-18": "Annual Quality Assurance Report (AQAR) 2017-18",
    "aqar-2018-19": "Annual Quality Assurance Report (AQAR) 2018-19",
    "aqar-2019-20": "Annual Quality Assurance Report (AQAR) 2019-20",
    "aqar-2020-21": "Annual Quality Assurance Report (AQAR) 2020-21",
  };

  // ------------------------------------------
  // UNIFIED PLACEHOLDER VIEWS FOR AQAR SUBMISSIONS
  // ------------------------------------------
  if (normalizedId && Object.keys(aqarLabelMap).includes(normalizedId)) {
    const contextTitle = aqarLabelMap[normalizedId];

    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="Annual Quality Assurance Report" 
          title={contextTitle} 
          subtitle="National Assessment and Accreditation Council (NAAC) statutory submission track." 
        />
        <section className="py-12 px-4 max-w-xl mx-auto text-center space-y-5">
          <div className="border border-border bg-card p-8 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-primary" />
            <div className="mx-auto size-14 bg-amber-500/10 text-amber-600 flex items-center justify-center rounded-2xl mb-4">
              <FolderSync className="size-6 text-gold-deep" />
            </div>
            <h2 className="text-lg font-extrabold text-primary mb-2">AQAR Archival Synchronizing</h2>
            <p className="text-xs text-muted-foreground mb-4">
              The underlying compliance metrics data ledger and official PDF track for <span className="font-bold text-foreground bg-muted px-1.5 py-0.5 rounded border">{contextTitle}</span> are currently being structured for online publishing.
            </p>
            <div className="bg-muted/40 border p-4 rounded-xl text-left text-[11px] text-muted-foreground flex gap-2.5 mb-4">
              <CloudLightning className="size-4 text-amber-600 shrink-0" />
              <span>Once database updates are finalized, the verified document will hot-load here for immediate review.</span>
            </div>
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">
              <ArrowLeft className="size-3.5" /> Return to Dashboard
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-lg font-bold text-primary">Not Found</h1>
      <Link to="/" className="text-xs font-bold text-primary underline">Return Home</Link>
    </div>
  );
}