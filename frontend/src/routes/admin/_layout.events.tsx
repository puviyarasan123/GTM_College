import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "@/lib/content-fns";
import type { Attachment, EventItem } from "@/lib/content-fns";
import { AttachmentUploader } from "@/components/admin/AttachmentUploader";
import { Plus, Trash2, Pencil, Eye, EyeOff, Loader2, Paperclip, CalendarClock } from "lucide-react";

const EMPTY = {
  day: "",
  month: "",
  title: "",
  venue: "",
  time: "",
  description: "",
  eventDate: "",
  attachments: [] as Attachment[],
  published: true,
};

const field = "w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold";
const label = "text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Picking a date fills in the day/month badge shown on the cards. */
function badgeFromIso(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return { day: String(d.getDate()).padStart(2, "0"), month: MONTHS[d.getMonth()] };
}

/**
 * Dates are stored as UTC midnight, so read them back in UTC — using local
 * parts would shift the day for timezones behind UTC.
 */
function isoFromValue(value: string | null) {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

function isPast(value: string | null) {
  if (!value) return false;
  const iso = isoFromValue(value);
  if (!iso) return false;
  const today = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return iso < `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
}

export const Route = createFileRoute("/admin/_layout/events")({
  loader: () => getAllEvents(),
  component: EventsPage,
});

function EventsPage() {
  const items = Route.useLoaderData() as EventItem[];
  const router = useRouter();
  const [modal, setModal] = useState<null | "create" | EventItem>(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (patch: Partial<typeof EMPTY>) => setForm((f) => ({ ...f, ...patch }));

  function setDate(iso: string) {
    const badge = badgeFromIso(iso);
    set({ eventDate: iso, ...(badge ?? {}) });
  }

  function openCreate() { setForm(EMPTY); setError(""); setModal("create"); }

  function openEdit(item: EventItem) {
    setForm({
      day: item.day,
      month: item.month,
      title: item.title,
      venue: item.venue,
      time: item.time,
      description: item.description ?? "",
      eventDate: isoFromValue(item.eventDate),
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
      if (modal === "create") await createEvent({ data: form });
      else if (modal) await updateEvent({ data: { id: (modal as EventItem).id, data: form } });
      await router.invalidate();
      setModal(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save this event.");
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

  const upcoming = items.filter((e) => !isPast(e.eventDate));
  const past = items.filter((e) => isPast(e.eventDate));

  function renderCard(item: EventItem) {
    const files = (item.attachments ?? []) as Attachment[];
    return (
      <div key={item.id} className="bg-card rounded-2xl border border-border p-5 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="size-14 rounded-xl bg-primary/5 grid place-items-center text-center shrink-0">
            <div>
              <div className="text-xl font-extrabold text-primary leading-none">{item.day}</div>
              <div className="text-[10px] text-gold-deep font-bold tracking-widest">{item.month}</div>
            </div>
          </div>
          <div className="flex gap-1">
            <button onClick={() => togglePublish(item)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title={item.published ? "Unpublish" : "Publish"}>
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
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {!item.published && <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] font-bold">Draft</span>}
          {!item.eventDate && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">No date set</span>
          )}
          {files.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-[10px] font-bold">
              <Paperclip className="size-3" /> {files.length}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Events</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {items.length} events · {upcoming.length} upcoming · {items.filter((e) => e.published).length} live on the site
          </p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
          <Plus className="size-4" /> New Event
        </button>
      </div>

      <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Upcoming & undated</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcoming.map(renderCard)}
      </div>
      {upcoming.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No upcoming events. Add one so the home page has something to show.
        </div>
      )}

      {past.length > 0 && (
        <>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-10 mb-3">Past events</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-70">
            {past.map(renderCard)}
          </div>
        </>
      )}

      {modal !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-xl shadow-elegant max-h-[92vh] overflow-y-auto">
            <h2 className="font-extrabold text-lg text-foreground mb-5">{modal === "create" ? "New Event" : "Edit Event"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={label}>Event date</label>
                <input type="date" value={form.eventDate} onChange={(e) => setDate(e.target.value)} className={field} />
                <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1.5">
                  <CalendarClock className="size-3" /> Sets the date badge and keeps upcoming events at the top of the site.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={label}>Day badge</label>
                  <input value={form.day} onChange={(e) => set({ day: e.target.value })} required placeholder="14" className={field} />
                </div>
                <div>
                  <label className={label}>Month badge</label>
                  <input value={form.month} onChange={(e) => set({ month: e.target.value.toUpperCase() })} required placeholder="SEP" list="event-months" className={field} />
                  <datalist id="event-months">{MONTHS.map((m) => <option key={m} value={m} />)}</datalist>
                </div>
              </div>
              <div>
                <label className={label}>Title</label>
                <input value={form.title} onChange={(e) => set({ title: e.target.value })} required className={field} />
              </div>
              <div>
                <label className={label}>Venue</label>
                <input value={form.venue} onChange={(e) => set({ venue: e.target.value })} required className={field} />
              </div>
              <div>
                <label className={label}>Time</label>
                <input value={form.time} onChange={(e) => set({ time: e.target.value })} required placeholder="09:00 – 18:00" className={field} />
              </div>
              <div>
                <label className={label}>Description (optional)</label>
                <textarea rows={4} value={form.description} onChange={(e) => set({ description: e.target.value })} className={`${field} resize-y`} placeholder="Programme details, who can attend, contact person…" />
              </div>

              <AttachmentUploader value={form.attachments} onChange={(attachments) => set({ attachments })} folder="gtmc/events" label="Attach a file (PDF / JPG)" />

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
