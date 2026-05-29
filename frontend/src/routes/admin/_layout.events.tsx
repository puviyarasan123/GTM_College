import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "@/lib/content-fns";
import { Plus, Trash2, Pencil, Eye, EyeOff } from "lucide-react";

type EventItem = Awaited<ReturnType<typeof getAllEvents>>[number];

const EMPTY = { day: "", month: "", title: "", venue: "", time: "", published: true };

export const Route = createFileRoute("/admin/_layout/events")({
  loader: () => getAllEvents(),
  component: EventsPage,
});

function EventsPage() {
  const items = Route.useLoaderData();
  const router = useRouter();
  const [modal, setModal] = useState<null | "create" | EventItem>(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  function openCreate() { setForm(EMPTY); setModal("create"); }
  function openEdit(item: EventItem) {
    setForm({ day: item.day, month: item.month, title: item.title, venue: item.venue, time: item.time, published: item.published });
    setModal(item);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (modal === "create") {
        await createEvent({ data: form });
      } else if (modal) {
        await updateEvent({ data: { id: (modal as EventItem).id, data: form } });
      }
      setModal(null);
      router.invalidate();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    await deleteEvent({ data: { id } });
    router.invalidate();
  }

  async function togglePublish(item: EventItem) {
    await updateEvent({ data: { id: item.id, data: { published: !item.published } } });
    router.invalidate();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Events</h1>
          <p className="text-muted-foreground text-sm mt-1">{items.length} events total</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
          <Plus className="size-4" /> New Event
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="size-14 rounded-xl bg-primary/5 grid place-items-center text-center shrink-0">
                <div className="text-xl font-extrabold text-primary leading-none">{item.day}</div>
                <div className="text-[10px] text-gold-deep font-bold tracking-widest">{item.month}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => togglePublish(item)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  {item.published ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                </button>
                <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="size-3.5" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
            <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
            <div className="text-xs text-muted-foreground mt-1">{item.venue}</div>
            <div className="text-xs text-muted-foreground">{item.time}</div>
            {!item.published && <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] font-bold">Draft</span>}
          </div>
        ))}
      </div>

      {modal !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-elegant">
            <h2 className="font-extrabold text-lg text-foreground mb-5">{modal === "create" ? "New Event" : "Edit Event"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Day</label>
                  <input value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} required placeholder="14" className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Month</label>
                  <input value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} required placeholder="SEP" className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Venue</label>
                <input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} required className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Time</label>
                <input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required placeholder="09:00 – 18:00" className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
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
