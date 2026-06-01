import { Link } from "@tanstack/react-router";
import { FileText, ExternalLink, Download, ArrowLeft, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDynamicSection } from "@/lib/content-fns";
import type { PdfEntry } from "@/lib/content-fns";

function PdfTable({ pdfs, title }: { pdfs: PdfEntry[]; title: string }) {
  if (!pdfs || pdfs.length === 0) return null;
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/30">
        <FileText className="size-5 text-red-500" />
        <h3 className="font-bold text-sm">{title} — Documents</h3>
        <span className="ml-auto text-xs text-muted-foreground">{pdfs.length} file{pdfs.length > 1 ? "s" : ""}</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/20">
            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground w-10">#</th>
            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Document Title</th>
            <th className="text-right px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {pdfs.map((pdf, i) => (
            <tr key={i} className="hover:bg-muted/20 transition-colors">
              <td className="px-5 py-3.5 text-muted-foreground text-xs">{i + 1}</td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-red-500/10 grid place-items-center shrink-0">
                    <FileText className="size-4 text-red-500" />
                  </div>
                  <span className="font-medium text-foreground">{pdf.title}</span>
                </div>
              </td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2 justify-end">
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="size-3.5" /> View
                  </a>
                  <a
                    href={pdf.url}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary text-xs font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    <Download className="size-3.5" /> Download
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface Props {
  group: string;
  slug: string;
  eyebrow: string;
}

export function DynamicSectionPage({ group, slug, eyebrow }: Props) {
  const { data: section, isLoading } = useQuery({
    queryKey: ["dynamic-section", group, slug],
    queryFn: () => getDynamicSection(group, slug),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!section) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 gap-4">
        <h1 className="text-xl font-bold text-primary">Page Not Found</h1>
        <p className="text-sm text-muted-foreground">This page doesn't exist or hasn't been published yet.</p>
        <Link to="/" className="text-sm font-bold text-primary underline inline-flex items-center gap-1">
          <ArrowLeft className="size-3.5" /> Return Home
        </Link>
      </div>
    );
  }

  const pdfs = (section.pdfs as PdfEntry[]) ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-16 px-4 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="max-w-5xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-gold bg-white/10 px-3 py-1 rounded-full">
            {eyebrow}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{section.title}</h1>
          {section.subtitle && (
            <p className="text-sm md:text-base max-w-2xl text-white/80 leading-relaxed">{section.subtitle}</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Content */}
        {section.content && (
          <div className="text-foreground leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {section.content}
          </div>
        )}

        {/* PDF Table */}
        <PdfTable pdfs={pdfs} title={section.title} />

        {!section.content && pdfs.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm border-2 border-dashed rounded-2xl">
            Content coming soon. Please check back later.
          </div>
        )}

        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="size-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
