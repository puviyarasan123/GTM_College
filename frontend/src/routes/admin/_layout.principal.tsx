import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { getPrincipal, savePrincipal, uploadImage } from "@/lib/content-fns";
import type { PrincipalData } from "@/lib/content-fns";
import { PRINCIPAL, SITE } from "@/lib/site-data";
import { Save, Plus, Trash2, Upload, Loader2 } from "lucide-react";

const DEFAULT: PrincipalData = {
  name: PRINCIPAL.name,
  title: PRINCIPAL.title,
  qual: PRINCIPAL.qual,
  image: PRINCIPAL.image,
  message: [
    "The Principal extends a warm welcome to the students who visit the portals of Government Thirumagal Mills College, Gudiyattam.",
    "Government Thirumagal Mills College is at the threshold of two states — Tamil Nadu and Andhra Pradesh — in a serene atmosphere, serving the cause of Higher Education to rural students.",
    "The college upholds the cause of educating India by adopting modern infrastructure and pedagogies. First generation learners from rural backgrounds enter the portals of a learning community.",
    "The college aims to provide sufficient opportunities to each student to grow as responsible citizens — since the progress of the nation depends on the potential of its youth.",
  ],
};

export const Route = createFileRoute("/admin/_layout/principal")({
  loader: async () => {
    try {
      const data = await getPrincipal();
      if (data) return data as PrincipalData;
    } catch {}
    return DEFAULT;
  },
  component: AdminPrincipalPage,
});

function AdminPrincipalPage() {
  const loaded = Route.useLoaderData() as PrincipalData;
  const router = useRouter();
  const [form, setForm] = useState<PrincipalData>(loaded);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function setField(key: keyof PrincipalData, value: string | null) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  function setParagraph(i: number, value: string) {
    const msg = [...form.message];
    msg[i] = value;
    setForm((f) => ({ ...f, message: msg }));
    setSaved(false);
  }

  function addParagraph() {
    setForm((f) => ({ ...f, message: [...f.message, ""] }));
    setSaved(false);
  }

  function removeParagraph(i: number) {
    setForm((f) => ({ ...f, message: f.message.filter((_, idx) => idx !== i) }));
    setSaved(false);
  }

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setUploadError("Max file size is 5MB"); return; }
    setUploadError("");
    setUploading(true);
    try {
      const url = await uploadImage(file, "gtmc/principal");
      setField("image", url);
    } catch {
      setUploadError("Upload failed. Check Cloudinary credentials.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await savePrincipal({ data: form });
      setSaved(true);
      router.invalidate();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Principal's Page</h1>
          <p className="text-muted-foreground text-sm mt-1">Update details and message shown on the public page.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Profile details */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Profile Details</h2>
          {[
            { key: "name", label: "Full Name", placeholder: "Dr. J. Ebanasar" },
            { key: "title", label: "Title / Designation", placeholder: "Principal" },
            { key: "qual", label: "Qualifications", placeholder: "M.Sc., Ph.D." },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">{label}</label>
              <input
                value={(form as Record<string, string | null>)[key] ?? ""}
                onChange={(e) => setField(key as keyof PrincipalData, e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary"
              />
            </div>
          ))}
        </div>

        {/* Photo upload */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Principal's Photo</h2>
          <div className="flex items-start gap-5">
            {/* Preview */}
            <div className="w-28 rounded-2xl overflow-hidden border border-border bg-secondary shrink-0" style={{ aspectRatio: "3/4" }}>
              {form.image ? (
                <img
                  src={form.image}
                  alt="Principal"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => (e.currentTarget.style.opacity = "0.3")}
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-muted-foreground text-xs text-center p-2">No photo</div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-sm font-semibold hover:bg-secondary/80 disabled:opacity-60 w-full justify-center"
              >
                {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                {uploading ? "Uploading to Cloudinary…" : "Upload New Photo"}
              </button>
              <p className="text-xs text-muted-foreground">JPG, PNG or WEBP · Max 5MB · Uploaded to Cloudinary CDN</p>
              {form.image && (
                <button
                  type="button"
                  onClick={() => setField("image", null)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove photo
                </button>
              )}
              {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
              {form.image && (
                <p className="text-[10px] text-muted-foreground break-all font-mono bg-secondary px-2 py-1 rounded-lg">{form.image}</p>
              )}
            </div>
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
        </div>

        {/* Message paragraphs */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message Paragraphs</h2>
            <button onClick={addParagraph} className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
              <Plus className="size-3.5" /> Add Paragraph
            </button>
          </div>
          {form.message.map((para, i) => (
            <div key={i}>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Paragraph {i + 1}</label>
              <div className="flex gap-2">
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => setParagraph(i, e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary resize-y"
                />
                <button
                  onClick={() => removeParagraph(i)}
                  className="size-9 shrink-0 grid place-items-center rounded-xl hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live preview */}
        <div className="bg-secondary/50 rounded-2xl border border-border p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Live Preview</p>
          <div className="flex items-center gap-4">
            {form.image ? (
              <img src={form.image} alt={form.name} className="size-16 rounded-full object-cover object-top border-2 border-gold" />
            ) : (
              <div className="size-16 rounded-full bg-gradient-to-br from-primary to-primary-deep grid place-items-center text-2xl font-extrabold text-gold">
                {form.name?.[0] ?? "P"}
              </div>
            )}
            <div>
              <div className="font-extrabold text-primary">{form.name || "—"}</div>
              <div className="text-sm text-muted-foreground">{form.title}</div>
              <div className="text-xs text-gold-deep font-semibold">{form.qual}</div>
              <div className="text-xs text-muted-foreground">{SITE.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
