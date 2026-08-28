import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getAllNews, createNews, updateNews, deleteNews } from "@/lib/content-fns";
import type { Attachment, NewsItem } from "@/lib/content-fns";
import { AttachmentUploader } from "@/components/admin/AttachmentUploader";
import { Plus, Trash2, Pencil, Eye, EyeOff, Paperclip, Loader2, Search } from "lucide-react";

const EMPTY = {
  date: "",
  category: "",
  title: "",
  excerpt: "",
  content: "",
  attachments: [] as Attachment[],
  published: true,
};

const CATEGORIES = ["Admissions", "Academics", "Events", "Placements", "Research", "Awards", "Notice", "General"];

const field = "w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold";
const label = "text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5";

/** "May 18, 2026" — the display format used across the site. */
function formatDisplayDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

/**
 * Local-safe YYYY-MM-DD. `toISOString()` shifts to UTC, which pushed the date
 * picker one day back for timezones ahead of UTC (IST included).
 */
function toIsoDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** "May 18, 2026" → "2026-05-18" for the <input type="date"> value. */
function isoFromDisplay(display: string) {
  const d = new Date(display);
  return Number.isNaN(d.getTime()) ? "" : toIsoDate(d);
}

function todayIso() {
  return toIsoDate(new Date());
}

export const Route = createFileRoute("/admin/_layout/news")({
  loader: () => getAllNews(),
  component: NewsPage,
});

function NewsPage() {
  const items = Route.useLoaderData() as NewsItem[];
  const router = useRouter();
  const [modal, setModal] = useState<null | "create" | NewsItem>(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const set = (patch: Partial<typeof EMPTY>) => setForm((f) => ({ ...f, ...patch }));

  const filtered = items.filter((n) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [n.title, n.category, n.excerpt, n.content].some((v) => (v ?? "").toLowerCase().includes(q));
  });

  function openCreate() {
    setForm({ ...EMPTY, date: formatDisplayDate(todayIso()) });
    setError("");
    setModal("create");
  }

  function openEdit(item: NewsItem) {
    setForm({
      date: item.date,
      category: item.category,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content ?? "",
      attachments: (item.attachments ?? []) as Attachment[],
      published: item.published,
    });
    setError("");
    setModal(item);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (modal === "create") await createNews({ data: form });
      else if (modal) await updateNews({ data: { id: (modal as NewsItem).id, data: form } });
      await router.invalidate();
      setModal(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save this article.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this news item?")) return;
    await deleteNews({ data: { id } });
    router.invalidate();
  }

  async function togglePublish(item: NewsItem) {
    await updateNews({ data: { id: item.id, data: { published: !item.published } } });
    router.invalidate();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">News & Announcements</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {items.length} articles · {items.filter((n) => n.published).length} live on the site
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles…" className="pl-9 pr-3 py-2.5 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold w-56" />
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
            <Plus className="size-4" /> New Article
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => {
          const files = (item.attachments ?? []) as Attachment[];
          return (
            <div key={item.id} className="bg-card rounded-2xl border border-border p-5 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1 flex-wrap">
                  <span className="font-bold text-gold-deep uppercase tracking-widest">{item.category}</span>
                  <span>·</span>
                  <span>{item.date}</span>
                  {!item.published && <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-bold">Draft</span>}
                  {files.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary font-bold">
                      <Paperclip className="size-3" /> {files.length}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.excerpt}</p>
                {item.content && <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-1">{item.content}</p>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => togglePublish(item)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title={item.published ? "Unpublish" : "Publish"}>
                  {item.published ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </button>
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="size-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            {items.length === 0 ? "No articles yet — publish your first one." : `No articles match “${query}”.`}
          </div>
        )}
      </div>

      {modal !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-2xl shadow-elegant max-h-[92vh] overflow-y-auto">
            <h2 className="font-extrabold text-lg text-foreground mb-5">{modal === "create" ? "New Article" : "Edit Article"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={label}>Date</label>
                  <input
                    type="date"
                    value={isoFromDisplay(form.date)}
                    onChange={(e) => set({ date: formatDisplayDate(e.target.value) })}
                    className={field}
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">Shows as “{form.date || "—"}”</p>
                </div>
                <div>
                  <label className={label}>Category</label>
                  <input value={form.category} onChange={(e) => set({ category: e.target.value })} required list="news-categories" placeholder="Admissions" className={field} />
                  <datalist id="news-categories">
                    {CATEGORIES.map((c) => <option key={c} value={c} />)}
                  </datalist>
                </div>
              </div>
              <div>
                <label className={label}>Title</label>
                <input value={form.title} onChange={(e) => set({ title: e.target.value })} required className={field} />
              </div>
              <div>
                <label className={label}>Short summary — shown on cards and the home page</label>
                <textarea rows={2} value={form.excerpt} onChange={(e) => set({ excerpt: e.target.value })} required className={`${field} resize-y`} />
              </div>
              <div>
                <label className={label}>Message content — the full text readers open</label>
                <textarea
                  rows={7}
                  value={form.content}
                  onChange={(e) => set({ content: e.target.value })}
                  placeholder="Write the full announcement here. Leave a blank line between paragraphs."
                  className={`${field} resize-y`}
                />
              </div>

              <AttachmentUploader value={form.attachments} onChange={(attachments) => set({ attachments })} folder="gtmc/news" label="Attach a file (PDF / JPG)" />

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => set({ published: e.target.checked })} className="size-4 rounded" />
                <span className="text-sm font-medium text-foreground">Published</span>
              </label>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="flex-1 py-3 rounded-xl border border-border text-sm font-bold hover:bg-secondary">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  {loading ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
