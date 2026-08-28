import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from "@/lib/content-fns";
import { Plus, Trash2, Pencil, ToggleLeft, ToggleRight, ArrowUp, ArrowDown, Megaphone } from "lucide-react";
import { Marquee } from "@/components/site/Marquee";

type Ann = Awaited<ReturnType<typeof getAllAnnouncements>>[number];

export const Route = createFileRoute("/admin/_layout/announcements")({
  loader: () => getAllAnnouncements(),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const items = Route.useLoaderData() as Ann[];
  const router = useRouter();
  const [modal, setModal] = useState<null | "create" | Ann>(null);
  const [text, setText] = useState("");
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  const activeItems = items.filter((a) => a.active);
  const previewDuration = Math.min(120, Math.max(25, Math.round(activeItems.reduce((n, a) => n + a.text.length, 0) / 4)));

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

  /**
   * Swaps `order` with the neighbour. The ticker renders strictly by this
   * field, so shuffling here is what changes the order visitors see.
   */
  async function reorder(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const a = items[index];
    const b = items[target];
    await Promise.all([
      updateAnnouncement({ data: { id: a.id, order: b.order } }),
      updateAnnouncement({ data: { id: b.id, order: a.order } }),
    ]);
    router.invalidate();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Announcements Ticker</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {activeItems.length} of {items.length} showing in the scrolling bar at the top of the site
          </p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
          <Plus className="size-4" /> New Announcement
        </button>
      </div>

      {/* Live preview — exactly what visitors see at the top of the site. */}
      <div className="mb-8 rounded-2xl overflow-hidden border border-border">
        <div className="px-4 py-2 bg-secondary text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Live preview
        </div>
        {activeItems.length > 0 ? (
          <div className="bg-primary-deep text-primary-foreground">
            <div className="px-4 flex items-center gap-4 h-9">
              <div className="flex items-center gap-2 shrink-0 text-gold text-[11px] font-bold uppercase tracking-widest">
                <Megaphone className="size-3.5" /> Latest
              </div>
              <Marquee durationSeconds={previewDuration} className="flex-1" groupClassName="gap-12 pr-12">
                {activeItems.map((item) => (
                  <span key={item.id} className="inline-flex items-center gap-3 whitespace-nowrap text-xs font-medium text-white/85">
                    <span className="size-1 rounded-full bg-gold/70 shrink-0" />
                    {item.text}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        ) : (
          <p className="p-4 text-sm text-muted-foreground">
            Nothing active — the site falls back to its built-in announcements.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item: Ann, i: number) => (
          <div key={item.id} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
            <div className="size-8 rounded-lg bg-secondary grid place-items-center text-xs font-bold text-muted-foreground shrink-0">
              {item.order}
            </div>
            <p className={`flex-1 text-sm ${item.active ? "text-foreground" : "text-muted-foreground line-through"}`}>{item.text}</p>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => reorder(i, -1)} disabled={i === 0} className="p-2 rounded-lg hover:bg-secondary disabled:opacity-30" title="Move up">
                <ArrowUp className="size-4" />
              </button>
              <button onClick={() => reorder(i, 1)} disabled={i === items.length - 1} className="p-2 rounded-lg hover:bg-secondary disabled:opacity-30" title="Move down">
                <ArrowDown className="size-4" />
              </button>
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
