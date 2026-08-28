import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { getEvents } from "@/lib/content-fns";
import type { Attachment, EventItem } from "@/lib/content-fns";
import { SITE } from "@/lib/site-data";
import { Calendar, CalendarX2, Clock, Download, FileText, ImageIcon, MapPin } from "lucide-react";

export const Route = createFileRoute("/events")({
  loader: async (): Promise<EventItem[]> => {
    try {
      return await getEvents();
    } catch {
      return [];
    }
  },
  head: () => ({
    meta: [
      { title: `Events — ${SITE.name}` },
      { name: "description", content: "Upcoming seminars, symposia, workshops and cultural events at Govt. Thirumagal Mills College." },
    ],
  }),
  component: EventsPage,
});

/**
 * Events are stored at UTC midnight; compare calendar days so an event
 * happening today never slips into the "concluded" list.
 */
function isPast(value: string | null) {
  if (!value) return false;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return false;
  const pad = (n: number) => String(n).padStart(2, "0");
  const today = new Date();
  return d.toISOString().slice(0, 10) < `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
}

function EventCard({ event, index, dimmed }: { event: EventItem; index: number; dimmed?: boolean }) {
  const files = (event.attachments ?? []) as Attachment[];
  return (
    <Reveal delay={Math.min(index * 0.05, 0.3)}>
      <div className={`rounded-2xl border border-border bg-card p-7 h-full hover:shadow-elegant hover:-translate-y-0.5 transition-all ${dimmed ? "opacity-75" : ""}`}>
        <div className="flex items-start gap-4">
          <div className="shrink-0 size-16 rounded-2xl bg-gradient-hero text-primary-foreground grid place-items-center text-center">
            <div>
              <div className="text-xl font-extrabold leading-none">{event.day}</div>
              <div className="text-[10px] text-gold font-bold tracking-widest mt-0.5">{event.month}</div>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-primary leading-snug">{event.title}</h3>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" /> {event.venue}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> {event.time}</span>
            </div>
          </div>
        </div>

        {event.description && (
          <div className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
            {event.description.split(/\n{2,}/).filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-2">
            {files.map((file, i) => {
              const Icon = file.type?.startsWith("image/") ? ImageIcon : FileText;
              return (
                <a
                  key={`${file.url}-${i}`}
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-secondary/60 text-xs font-semibold text-primary hover:border-gold/50 transition-colors"
                >
                  <Icon className="size-3.5 text-gold-deep" />
                  <span className="max-w-[200px] truncate">{file.name || "Attachment"}</span>
                  <Download className="size-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </Reveal>
  );
}

function EventsPage() {
  const events = Route.useLoaderData() as EventItem[];
  const upcoming = events.filter((e) => !isPast(e.eventDate));
  const past = events.filter((e) => isPast(e.eventDate));

  return (
    <>
      <PageHero eyebrow="Calendar" title="Upcoming events on campus." />
      <Section>
        {upcoming.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {upcoming.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
            <CalendarX2 className="size-8 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">No upcoming events are scheduled right now. Please check back soon.</p>
          </div>
        )}

        {past.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="size-4 text-gold-deep" />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Recently concluded</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {past.slice(0, 6).map((e, i) => <EventCard key={e.id} event={e} index={i} dimmed />)}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
