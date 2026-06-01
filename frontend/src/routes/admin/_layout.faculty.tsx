import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { getFaculty, saveFaculty, uploadImage } from "@/lib/content-fns";
import type { FacultyMember } from "@/lib/content-fns";
import { FACULTY as STATIC_FACULTY } from "@/lib/site-data";
import { Plus, Trash2, Save, Pencil, X, GraduationCap, Upload, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/faculty")({
  loader: async () => {
    try {
      const data = await getFaculty();
      if (data && data.length > 0) return data;
    } catch {}
    return STATIC_FACULTY.map((f, i) => ({ ...f, id: String(i + 1), image: null })) as FacultyMember[];
  },
  component: AdminFacultyPage,
});

const EMPTY: Omit<FacultyMember, "id"> = { name: "", role: "", dept: "", qual: "", focus: "", image: null };

function ImageUploader({ value, onChange }: { value: string | null; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Max file size is 5MB"); return; }
    setError("");
    setUploading(true);
    try {
      const url = await uploadImage(file, "gtmc/faculty");
      onChange(url);
    } catch {
      setError("Upload failed. Check Cloudinary credentials.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">Photo</label>
      <div className="flex items-center gap-3">
        {/* Preview */}
        <div className="size-16 rounded-xl border border-border overflow-hidden bg-secondary grid place-items-center shrink-0">
          {value ? (
            <img src={value} alt="preview" className="w-full h-full object-cover object-top" />
          ) : (
            <GraduationCap className="size-6 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-sm font-semibold hover:bg-secondary/80 disabled:opacity-60 w-full justify-center"
          >
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            {uploading ? "Uploading…" : "Upload Photo"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-red-500 hover:underline w-full text-center"
            >
              Remove photo
            </button>
          )}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function AdminFacultyPage() {
  const loaded = Route.useLoaderData() as FacultyMember[];
  const router = useRouter();
  const [members, setMembers] = useState<FacultyMember[]>(loaded);
  const [editing, setEditing] = useState<FacultyMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  function openNew() {
    setEditing({ id: crypto.randomUUID(), ...EMPTY });
    setIsNew(true);
    setFormError("");
  }

  function openEdit(m: FacultyMember) {
    setEditing({ ...m });
    setIsNew(false);
    setFormError("");
  }

  function closeModal() { setEditing(null); setIsNew(false); setFormError(""); }

  function saveModal() {
    if (!editing) return;
    if (!editing.name.trim() || !editing.dept.trim()) {
      setFormError("Name and Department are required.");
      return;
    }
    setFormError("");
    setMembers((prev) =>
      isNew ? [...prev, editing] : prev.map((m) => (m.id === editing.id ? editing : m))
    );
    closeModal();
  }

  function deleteMember(id: string) {
    if (!confirm("Delete this faculty member?")) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  async function handleSaveAll() {
    setSaving(true);
    try {
      await saveFaculty({ data: members });
      router.invalidate();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Faculty Management</h1>
          <p className="text-muted-foreground text-sm mt-1">{members.length} members · click Save All to publish</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-foreground text-sm font-bold hover:bg-secondary/80">
            <Plus className="size-4" /> Add Member
          </button>
          <button onClick={handleSaveAll} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {saving ? "Saving…" : "Save All"}
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {members.map((m) => (
          <div key={m.id} className="bg-card rounded-2xl border border-border overflow-hidden group">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-gold/10 to-primary/5 relative grid place-items-center overflow-hidden">
              {m.image ? (
                <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="size-16 rounded-full bg-gradient-to-br from-primary to-primary-deep grid place-items-center text-2xl font-extrabold text-gold">
                  {m.name ? m.name.trim()[0].toUpperCase() : <GraduationCap className="size-7" />}
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => openEdit(m)} className="size-9 rounded-full bg-white grid place-items-center hover:bg-gold transition-colors">
                  <Pencil className="size-4 text-primary" />
                </button>
                <button onClick={() => deleteMember(m.id)} className="size-9 rounded-full bg-white grid place-items-center hover:bg-red-500 transition-colors group/del">
                  <Trash2 className="size-4 text-red-500 group-hover/del:text-white" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gold-deep mb-1">{m.dept}</div>
              <div className="font-bold text-primary text-sm leading-tight">{m.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{m.role}</div>
              <div className="text-xs text-gold-deep mt-1 font-semibold">{m.qual}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg shadow-elegant max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
              <h2 className="font-extrabold text-foreground">{isNew ? "Add Faculty Member" : "Edit Faculty Member"}</h2>
              <button onClick={closeModal} className="size-8 grid place-items-center rounded-full hover:bg-secondary">
                <X className="size-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {formError && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{formError}</p>}

              {/* Image uploader */}
              <ImageUploader
                value={editing.image}
                onChange={(url) => setEditing({ ...editing, image: url || null })}
              />

              {/* Text fields */}
              {[
                { key: "name", label: "Full Name *", placeholder: "Dr. A. Example" },
                { key: "role", label: "Designation", placeholder: "Assistant Professor" },
                { key: "dept", label: "Department *", placeholder: "Computer Science" },
                { key: "qual", label: "Qualifications", placeholder: "M.Sc., Ph.D." },
                { key: "focus", label: "Area of Focus", placeholder: "Data Structures & Algorithms" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">{label}</label>
                  <input
                    value={(editing as Record<string, string | null>)[key] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 p-5 border-t border-border sticky bottom-0 bg-card">
              <button onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold">Cancel</button>
              <button onClick={saveModal} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
                {isNew ? "Add Member" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
