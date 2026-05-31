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

// REGISTER THE NEW standalone "/nirf/$tabId" path routing node
export const Route = createFileRoute("/nirf/$tabId")({
  component: NirfDynamicPage,
});

function NirfDynamicPage() {
  const { tabId } = useParams({ from: "/nirf/$tabId" });
  const normalizedId = tabId?.toLowerCase();

  const nirfLabelMap: Record<string, string> = {
    "nirf-college-2025": "NIRF - COLLEGE 2025 Data Submission",
    "nirf-overall-2024": "NIRF - OVERALL 2024 Evaluation",
    "nirf-college-2024": "NIRF - COLLEGE 2024 Data Submission",
    "nirf-college-2023": "NIRF - COLLEGE 2023 Data Submission",
    "nirf-overall-2023": "NIRF - OVERALL 2023 Evaluation",
  };

  // ------------------------------------------
  // UNIFIED PLACEHOLDER VIEWS FOR DATA YEARS
  // ------------------------------------------
  if (normalizedId && Object.keys(nirfLabelMap).includes(normalizedId)) {
    const contextTitle = nirfLabelMap[normalizedId];

    return (
      <div className="min-h-screen bg-background text-foreground pb-12">
        <PageHero 
          eyebrow="National Institutional Ranking Framework" 
          title={contextTitle} 
          subtitle="Statutory national benchmarking data and submission reporting dossiers." 
        />
        <section className="py-12 px-4 max-w-xl mx-auto text-center space-y-5">
          <div className="border border-border bg-card p-8 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-primary" />
            <div className="mx-auto size-14 bg-amber-500/10 text-amber-600 flex items-center justify-center rounded-2xl mb-4">
              <FolderSync className="size-6 text-gold-deep" />
            </div>
            <h2 className="text-lg font-extrabold text-primary mb-2">NIRF Dossier Vault Syncing</h2>
            <p className="text-xs text-muted-foreground mb-4">
              The formal framework submission parameters and target dynamic PDFs for <span className="font-bold text-foreground bg-muted px-1.5 py-0.5 rounded border">{contextTitle}</span> are currently being verified by the computing team.
            </p>
            <div className="bg-muted/40 border p-4 rounded-xl text-left text-[11px] text-muted-foreground flex gap-2.5 mb-4">
              <CloudLightning className="size-4 text-amber-600 shrink-0" />
              <span>Once administrative clearance completes, files will open directly via this dynamic path handler.</span>
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