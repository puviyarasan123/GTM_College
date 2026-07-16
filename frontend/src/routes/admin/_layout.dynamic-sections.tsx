import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllDynamicSections, saveDynamicSection, deleteDynamicSection } from "@/lib/content-fns";
import type { DynamicSection, PdfEntry } from "@/lib/content-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, Pencil, X, Check, Upload, Loader2, FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_layout/dynamic-sections")({
  component: AdminDynamicSectionsPage,
});

const GROUPS = [
  { value: "iqac", label: "IQAC" },
  { value: "nirf", label: "NIRF" },
  { value: "aqar", label: "AQAR" },
];

const EMPTY: Omit<DynamicSection, "id"> = {
  group: "iqac", slug: "", title: "", subtitle: "", content: "", pdfUrl: "", pdfs: [], order: 0, active: true,
};

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function uploadPdf(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const dataUrl = reader.result as string;
        const [meta, base64] = dataUrl.split(",");
        const mimeType = meta.replace("data:", "").replace(";base64", "");
        const res = await fetch("/api/upload/image", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ base64, mimeType, folder: "gtmc/docs", filename: file.name }),
        });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        resolve(data.url);
      } catch (e) { reject(e); }
    };
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

// ── PDF List Editor ───────────────────────────────────────────────────────────
function PdfListEditor({ pdfs, onChange }: { pdfs: PdfEntry[]; onChange: (p: PdfEntry[]) => void }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function updateTitle(i: number, title: string) {
    const next = [...pdfs];
    next[i] = { ...next[i], title };
    onChange(next);
  }

  function remove(i: number) {
    onChange(pdfs.filter((_, idx) => idx !== i));
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadPdf(file);
      onChange([...pdfs, { title: file.name.replace(/\.(pdf|zip)$/i, ""), url }]);
      toast.success("Document uploaded!");
    } catch { toast.error("Upload failed — check file size (max 50MB)"); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs">PDF Documents</Label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-xs font-semibold hover:bg-secondary/80 disabled:opacity-60"
        >
          {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
        <input ref={fileRef} type="file" accept="application/pdf,application/zip,.pdf,.zip" className="hidden" onChange={handleFile} />
      </div>

      {pdfs.length === 0 && (
        <p className="text-xs text-muted-foreground py-2 text-center border border-dashed rounded-lg">
          No PDFs yet. Click "Upload PDF" to add one.
        </p>
      )}

      <div className="space-y-2">
        {pdfs.map((pdf, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg border bg-muted/30">
            <FileText className="size-4 text-red-500 shrink-0" />
            <Input
              value={pdf.title}
              onChange={(e) => updateTitle(i, e.target.value)}
              placeholder="Document title"
              className="flex-1 h-7 text-xs"
            />
            <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
              <ExternalLink className="size-3.5" />
            </a>
            <button type="button" onClick={() => remove(i)} className="text-red-500 hover:text-red-600">
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section Form ──────────────────────────────────────────────────────────────
function SectionForm({
  initial, group, onSave, onCancel, saving,
}: {
  initial: Omit<DynamicSection, "id"> & { id?: string };
  group: string;
  onSave: (d: Omit<DynamicSection, "id"> & { id?: string }) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [d, setD] = useState({ ...initial, group, pdfs: initial.pdfs ?? [] });
  const set = (k: string, v: unknown) => setD((p) => ({ ...p, [k]: v }));

  return (
    <Card className="border-primary/30">
      <CardContent className="pt-4 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Menu Label (Title) *</Label>
            <Input
              value={d.title}
              onChange={(e) => { set("title", e.target.value); if (!d.id) set("slug", slugify(e.target.value)); }}
              placeholder="e.g. IQAC Team"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">URL Slug *</Label>
            <Input value={d.slug} onChange={(e) => set("slug", slugify(e.target.value))} placeholder="e.g. team" />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Page Subtitle</Label>
          <Input value={d.subtitle} onChange={(e) => set("subtitle", e.target.value)} placeholder="Brief description shown under the title" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Page Content</Label>
          <Textarea value={d.content} onChange={(e) => set("content", e.target.value)} rows={4} placeholder="Main content / description for this page..." />
        </div>

        <PdfListEditor pdfs={d.pdfs} onChange={(p) => set("pdfs", p)} />

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Display Order</Label>
            <Input type="number" value={d.order} onChange={(e) => set("order", Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-2 pt-5">
            <Switch checked={d.active} onCheckedChange={(v) => set("active", v)} id="sec-active" />
            <Label htmlFor="sec-active" className="text-xs">Active (visible in menu)</Label>
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-1">
          <Button variant="outline" size="sm" onClick={onCancel}><X className="size-3.5 mr-1" />Cancel</Button>
          <Button size="sm" disabled={saving || !d.title || !d.slug} onClick={() => onSave(d)}>
            <Check className="size-3.5 mr-1" />{saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Group Tab ─────────────────────────────────────────────────────────────────
function GroupTab({ group }: { group: string }) {
  const qc = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { data: sections = [], isLoading } = useQuery({
    queryKey: ["dynamic-sections-admin", group],
    queryFn: () => getAllDynamicSections(group),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["dynamic-sections-admin", group] });

  const save = useMutation({
    mutationFn: saveDynamicSection,
    onSuccess: () => { invalidate(); setAdding(false); setEditId(null); toast.success("Saved!"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: deleteDynamicSection,
    onSuccess: () => { invalidate(); toast.success("Deleted!"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const groupLabel = GROUPS.find((g) => g.value === group)?.label ?? group.toUpperCase();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Menu items for <strong>{groupLabel}</strong> — each becomes a page at{" "}
          <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">/{group}/slug</code>
        </p>
        {!adding && (
          <Button size="sm" onClick={() => setAdding(true)}>
            <Plus className="size-4 mr-1" /> Add Menu Item
          </Button>
        )}
      </div>

      {adding && (
        <SectionForm
          initial={{ ...EMPTY, group }}
          group={group}
          onSave={(d) => save.mutate({ data: d })}
          onCancel={() => setAdding(false)}
          saving={save.isPending}
        />
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {!isLoading && sections.length === 0 && !adding && (
        <div className="text-center py-12 border-2 border-dashed rounded-2xl text-muted-foreground text-sm">
          No menu items yet. Click "Add Menu Item" to create the first one.
        </div>
      )}

      <div className="space-y-3">
        {sections.map((s) =>
          editId === s.id ? (
            <SectionForm
              key={s.id}
              initial={{ ...s, pdfs: (s.pdfs as PdfEntry[]) ?? [] }}
              group={group}
              onSave={(d) => save.mutate({ data: d })}
              onCancel={() => setEditId(null)}
              saving={save.isPending}
            />
          ) : (
            <Card key={s.id} className={!s.active ? "opacity-50" : ""}>
              <CardContent className="pt-4 flex gap-4 items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm">{s.title}</span>
                    <code className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">/{group}/{s.slug}</code>
                    {!s.active && <Badge variant="secondary" className="text-[10px]">Hidden</Badge>}
                    {(s.pdfs as PdfEntry[])?.length > 0 && (
                      <Badge variant="outline" className="text-[10px] gap-1">
                        <FileText className="size-2.5" /> {(s.pdfs as PdfEntry[]).length} PDF{(s.pdfs as PdfEntry[]).length > 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                  {s.subtitle && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{s.subtitle}</p>}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="icon" variant="ghost" className="size-8" onClick={() => setEditId(s.id)}>
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="size-8 text-red-500 hover:text-red-600"
                    onClick={() => del.mutate({ data: { id: s.id } })}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
function AdminDynamicSectionsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">IQAC / NIRF / AQAR Pages</h1>
        <p className="text-muted-foreground text-sm">Manage menu items, page content and PDF documents for each section.</p>
      </div>
      <Tabs defaultValue="iqac">
        <TabsList className="mb-4">
          {GROUPS.map((g) => <TabsTrigger key={g.value} value={g.value}>{g.label}</TabsTrigger>)}
        </TabsList>
        {GROUPS.map((g) => (
          <TabsContent key={g.value} value={g.value}>
            <GroupTab group={g.value} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
