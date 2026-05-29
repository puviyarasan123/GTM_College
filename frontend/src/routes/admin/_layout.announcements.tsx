import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from "@/lib/content-fns";
import { Plus, Trash2, Pencil, ToggleLeft, ToggleRight } from "lucide-react";

type Ann = Awaited<ReturnType<typeof getAllAnnouncements>>[number];

export const Route = createFileRoute("/admin/_layout/announcements")({
  loader: () => getAllAnnouncements(),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const items = Route.useLoaderData();
  const router = useRouter();
  const [modal, setModal] = useState<null | "create" | Ann>(null);
  const [text, setText] = useState("");
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  function openCreate() { setText(""); setOrder(items.length); setModal("create"); }
  function openEdit(item: Ann) { setText(item.text); setOrder(item.order); setModal(item); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (modal === "create") {
        await createAnnouncement({ data: { text, active: true, order } });
      } else if (modal) {
        await updateAnnouncement({ data: { id: (modal as Ann).id, text, order } });
      }
      setModal(null);
      router.invalidate();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this announcement?")) return;
    await deleteAnnouncement({ data: { id } });
    router.invalidate();
  }

  async function toggleActive(item: Ann) {
    await updateAnnouncement({ data: { id: item.id, active: !item.active } });
    router.invalidate();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Announcements Ticker</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage the scrolling ticker on the site header</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
          <Plus className="size-4" /> New Announcement
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item: Ann) => (
          <div key={item.id} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
            <div className="size-8 rounded-lg bg-secondary grid place-items-center text-xs font-bold text-muted-foreground shrink-0">
              {item.order}
            </div>
            <p className={`flex-1 text-sm ${item.active ? "text-foreground" : "text-muted-foreground line-through"}`}>{item.text}</p>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleActive(item)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title={item.active ? "Deactivate" : "Activate"}>
                {item.active ? <ToggleRight className="size-5 text-green-500" /> : <ToggleLeft className="size-5" />}
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
          <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-elegant">
            <h2 className="font-extrabold text-lg text-foreground mb-5">{modal === "create" ? "New Announcement" : "Edit Announcement"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Text</label>
                <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold resize-none" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Order</label>
                <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
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
