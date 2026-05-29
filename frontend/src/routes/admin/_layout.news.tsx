import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getAllNews, createNews, updateNews, deleteNews } from "@/lib/content-fns";
import { Plus, Trash2, Pencil, Eye, EyeOff } from "lucide-react";

type NewsItem = Awaited<ReturnType<typeof getAllNews>>[number];

const EMPTY = { date: "", category: "", title: "", excerpt: "", published: true };

export const Route = createFileRoute("/admin/_layout/news")({
  loader: () => getAllNews(),
  component: NewsPage,
});

function NewsPage() {
  const items = Route.useLoaderData();
  const router = useRouter();
  const [modal, setModal] = useState<null | "create" | NewsItem>(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  function openCreate() { setForm(EMPTY); setModal("create"); }
  function openEdit(item: NewsItem) { setForm({ date: item.date, category: item.category, title: item.title, excerpt: item.excerpt, published: item.published }); setModal(item); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (modal === "create") {
        await createNews({ data: form });
      } else if (modal) {
        await updateNews({ data: { id: (modal as NewsItem).id, data: form } });
      }
      setModal(null);
      router.invalidate();
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">News & Announcements</h1>
          <p className="text-muted-foreground text-sm mt-1">{items.length} articles total</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
          <Plus className="size-4" /> New Article
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item: NewsItem) => (
          <div key={item.id} className="bg-card rounded-2xl border border-border p-5 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span className="font-bold text-gold-deep uppercase tracking-widest">{item.category}</span>
                <span>·</span>
                <span>{item.date}</span>
                {!item.published && <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-bold">Draft</span>}
              </div>
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.excerpt}</p>
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
        ))}
      </div>

      {modal !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-lg shadow-elegant max-h-[90vh] overflow-y-auto">
            <h2 className="font-extrabold text-lg text-foreground mb-5">{modal === "create" ? "New Article" : "Edit Article"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Date</label>
                  <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required placeholder="May 18, 2026" className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required placeholder="Admissions" className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Excerpt</label>
                <textarea rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold resize-none" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="size-4 rounded" />
                <span className="text-sm font-medium text-foreground">Published</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="flex-1 py-3 rounded-xl border border-border text-sm font-bold hover:bg-secondary">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60">
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
