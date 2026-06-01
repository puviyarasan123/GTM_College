import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { getSiteImages, saveSiteImages, uploadImage } from "@/lib/content-fns";
import type { SiteImages } from "@/lib/content-fns";
import { Save, Upload, Loader2, Trash2, Plus, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/images")({
  loader: async () => {
    try { return await getSiteImages(); } catch { return {} as SiteImages; }
  },
  component: AdminImagesPage,
});

function CloudinaryUploadBtn({
  label, folder, onUploaded,
}: { label: string; folder: string; onUploaded: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { setErr("Max 8MB"); return; }
    setErr(""); setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onUploaded(url);
    } catch { setErr("Upload failed"); }
    finally { setUploading(false); if (ref.current) ref.current.value = ""; }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-sm font-semibold hover:bg-secondary/80 disabled:opacity-60"
      >
        {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
        {uploading ? "Uploading…" : label}
      </button>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle} />
      {err && <p className="text-xs text-red-500 mt-1">{err}</p>}
    </div>
  );
}

function ImageSlot({
  label, url, folder, onUploaded, onRemove,
}: { label: string; url?: string; folder: string; onUploaded: (url: string) => void; onRemove: () => void }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="aspect-video rounded-xl overflow-hidden bg-secondary border border-border grid place-items-center">
        {url ? (
          <img src={url} alt={label} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="size-8 text-muted-foreground/40" />
        )}
      </div>
      <div className="flex gap-2">
        <CloudinaryUploadBtn label="Upload" folder={folder} onUploaded={onUploaded} />
        {url && (
          <button onClick={onRemove} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 className="size-3.5" /> Remove
          </button>
        )}
      </div>
    </div>
  );
}

function AdminImagesPage() {
  const loaded = Route.useLoaderData() as SiteImages;
  const router = useRouter();
  const [images, setImages] = useState<SiteImages>(loaded);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set(key: keyof SiteImages, value: string | undefined) {
    setImages((p) => ({ ...p, [key]: value }));
    setSaved(false);
  }

  function setGalleryItem(i: number, field: "url" | "caption", value: string) {
    const g = [...(images.gallery ?? [])];
    g[i] = { ...g[i], [field]: value };
    setImages((p) => ({ ...p, gallery: g }));
    setSaved(false);
  }

  function addGalleryItem() {
    setImages((p) => ({ ...p, gallery: [...(p.gallery ?? []), { url: "", caption: "" }] }));
    setSaved(false);
  }

  function removeGalleryItem(i: number) {
    setImages((p) => ({ ...p, gallery: (p.gallery ?? []).filter((_, idx) => idx !== i) }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveSiteImages({ data: images });
      setSaved(true);
      router.invalidate();
    } catch (e) { alert(e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Site Images</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage hero slides, about section and gallery — all served via Cloudinary CDN.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save All"}
        </button>
      </div>

      {/* Hero Slides */}
      <div className="mb-8">
        <h2 className="font-bold text-foreground mb-1">Hero Slides</h2>
        <p className="text-xs text-muted-foreground mb-4">These appear in the homepage full-screen slideshow.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {([1, 2, 3] as const).map((n) => {
            const key = `hero${n}` as keyof SiteImages;
            const capKey = `hero${n}Caption` as keyof SiteImages;
            return (
              <div key={n} className="space-y-2">
                <ImageSlot
                  label={`Slide ${n}`}
                  url={images[key] as string | undefined}
                  folder="gtmc/hero"
                  onUploaded={(url) => set(key, url)}
                  onRemove={() => set(key, undefined)}
                />
                <input
                  value={(images[capKey] as string) ?? ""}
                  onChange={(e) => set(capKey, e.target.value)}
                  placeholder={`Slide ${n} eyebrow text`}
                  className="w-full px-3 py-2 rounded-xl bg-secondary text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* About Campus Image */}
      <div className="mb-8">
        <h2 className="font-bold text-foreground mb-1">About Section Image</h2>
        <p className="text-xs text-muted-foreground mb-4">Shown in the homepage About section and About page.</p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          <ImageSlot
            label="Campus Photo (About)"
            url={images.aboutCampus}
            folder="gtmc/about"
            onUploaded={(url) => set("aboutCampus", url)}
            onRemove={() => set("aboutCampus", undefined)}
          />
          <ImageSlot
            label="Welcome Section Image"
            url={images.welcomeImage}
            folder="gtmc/about"
            onUploaded={(url) => set("welcomeImage", url)}
            onRemove={() => set("welcomeImage", undefined)}
          />
        </div>
      </div>

      {/* Gallery */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-foreground">Gallery</h2>
            <p className="text-xs text-muted-foreground">Photos shown on the /gallery page.</p>
          </div>
          <button onClick={addGalleryItem} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-sm font-bold hover:bg-secondary/80">
            <Plus className="size-4" /> Add Photo
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(images.gallery ?? []).map((item, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-4 space-y-3">
              <div className="aspect-video rounded-xl overflow-hidden bg-secondary border border-border grid place-items-center">
                {item.url ? (
                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="size-8 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex gap-2">
                <CloudinaryUploadBtn
                  label="Upload"
                  folder="gtmc/gallery"
                  onUploaded={(url) => setGalleryItem(i, "url", url)}
                />
                <button onClick={() => removeGalleryItem(i)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <input
                value={item.caption}
                onChange={(e) => setGalleryItem(i, "caption", e.target.value)}
                placeholder="Caption (e.g. Convocation 2024)"
                className="w-full px-3 py-2 rounded-xl bg-secondary text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
