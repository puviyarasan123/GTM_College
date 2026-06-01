import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { getAlumni, saveAlumni, uploadImage } from "@/lib/content-fns";
import type { AlumniData } from "@/lib/content-fns";
import { Save, Plus, Trash2, Loader2, Upload, ImageIcon } from "lucide-react";

const DEFAULT: AlumniData = {
  heading: "Alumni Association",
  intro: "An alumnae association is an association of graduates or, more broadly, of former students. It is sometimes called an \"alumni meet\". The College has an Alumnae association which was established in 2008. The association conducts regular alumnae meets annually.",
  sections: [
    { title: "Necessities of an Alumnae Association", body: "The enthusiasm and willingness of several individuals who are willing to take on the organizational initiative and sustain it." },
    { title: "Alumnae Suggestion for Post Graduate Courses", body: "Institution has a good affinity with the Alumnae. The Alumnae has given a positive feedback." },
    { title: "Modes of Functioning", body: "The college has a registered alumni association functioning through two modes:\n\n(i) as an independent organisation,\n\n(ii) as an association endorsed by the College." },
  ],
  objectives: [
    "To keep a roster of all the Alumni of the college and establish a lifelong relationship with the Alumni.",
    "Maintaining the current information of the Alumni.",
    "To encourage, foster and promote close relations among the alumni.",
    "To motivate the Alumni to keep themselves engaged in productive pursuits useful to the society.",
    "To provide a forum for the Alumni for exchange of ideas on academic, cultural and social issues.",
  ],
  images: [],
};

export const Route = createFileRoute("/admin/_layout/alumni")({
  loader: async (): Promise<AlumniData> => {
    try {
      const data = await getAlumni();
      if (data) return data;
    } catch {}
    return DEFAULT;
  },
  component: AdminAlumniPage,
});

const INPUT = "w-full px-3 py-2 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary";

function AdminAlumniPage() {
  const loaded = Route.useLoaderData() as AlumniData;
  const router = useRouter();
  const [data, setData] = useState<AlumniData>(loaded);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof AlumniData>(key: K, value: AlumniData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  function updateSection(i: number, field: "title" | "body", value: string) {
    const sections = data.sections.map((s, idx) => idx === i ? { ...s, [field]: value } : s);
    update("sections", sections);
  }

  function updateObjective(i: number, value: string) {
    const objectives = data.objectives.map((o, idx) => idx === i ? value : o);
    update("objectives", objectives);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { alert("Max 8MB"); return; }
    setUploading(true);
    try {
      const url = await uploadImage(file, "gtmc/alumni");
      update("images", [...(data.images ?? []), { url, caption: "" }]);
    } catch { alert("Upload failed"); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  }

  function updateImageCaption(i: number, caption: string) {
    const images = (data.images ?? []).map((img, idx) => idx === i ? { ...img, caption } : img);
    update("images", images);
  }

  function removeImage(i: number) {
    update("images", (data.images ?? []).filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveAlumni({ data });
      setSaved(true);
      router.invalidate();
    } catch (e) { alert(e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Alumni Association</h1>
          <p className="text-muted-foreground text-sm mt-1">Edit content and images shown on the public Alumni page.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">

        {/* Heading & Intro */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Page Header</h2>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Heading</label>
            <input value={data.heading} onChange={(e) => update("heading", e.target.value)} className={INPUT} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Introduction Paragraph</label>
            <textarea rows={4} value={data.intro} onChange={(e) => update("intro", e.target.value)} className={INPUT + " resize-y"} />
          </div>
        </div>

        {/* Sections */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Content Sections</h2>
            <button onClick={() => update("sections", [...data.sections, { title: "", body: "" }])} className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
              <Plus className="size-3.5" /> Add Section
            </button>
          </div>
          {data.sections.map((sec, i) => (
            <div key={i} className="rounded-xl border border-border p-4 space-y-3 bg-secondary/30">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Section {i + 1}</label>
                <button onClick={() => update("sections", data.sections.filter((_, idx) => idx !== i))} className="size-7 grid place-items-center rounded-lg hover:bg-red-50 text-red-500">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <input value={sec.title} onChange={(e) => updateSection(i, "title", e.target.value)} placeholder="Section title" className={INPUT} />
              <textarea rows={5} value={sec.body} onChange={(e) => updateSection(i, "body", e.target.value)} placeholder="Section body (use blank lines for paragraphs)" className={INPUT + " resize-y"} />
            </div>
          ))}
        </div>

        {/* Objectives */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Objectives</h2>
            <button onClick={() => update("objectives", [...data.objectives, ""])} className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
              <Plus className="size-3.5" /> Add Objective
            </button>
          </div>
          {data.objectives.map((obj, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-xs font-bold text-muted-foreground mt-2.5 w-5 shrink-0">{i + 1}.</span>
              <input value={obj} onChange={(e) => updateObjective(i, e.target.value)} className={INPUT + " flex-1"} />
              <button onClick={() => update("objectives", data.objectives.filter((_, idx) => idx !== i))} className="size-9 grid place-items-center rounded-xl hover:bg-red-50 text-red-500 shrink-0 mt-0.5">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Alumni Photos</h2>
            <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-sm font-semibold hover:bg-secondary/80 disabled:opacity-60">
              {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
              {uploading ? "Uploading…" : "Upload Photo"}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>
          {(data.images ?? []).length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground text-sm">
              <ImageIcon className="size-8 mx-auto mb-2 opacity-30" />
              No photos yet. Upload images to display on the Alumni page.
            </div>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(data.images ?? []).map((img, i) => (
              <div key={i} className="rounded-xl border border-border bg-secondary/30 overflow-hidden">
                <div className="aspect-video relative">
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(i)} className="absolute top-2 right-2 size-7 rounded-full bg-red-500 text-white grid place-items-center hover:bg-red-600">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <div className="p-2">
                  <input value={img.caption} onChange={(e) => updateImageCaption(i, e.target.value)} placeholder="Caption (optional)" className={INPUT} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
