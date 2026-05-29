import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { EVENTS as STATIC_EVENTS } from "@/lib/site-data";
import { getEvents } from "@/lib/content-fns";
import { Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/events")({
  loader: async () => {
    try {
      const rows = await getEvents();
      if (rows.length > 0) return rows;
    } catch {}
    return STATIC_EVENTS.map((e, i) => ({ id: String(i), day: e.date.d, month: e.date.m, title: e.title, venue: e.venue, time: e.time, published: true, createdAt: new Date(), updatedAt: new Date() }));
  },
  component: EventsPage,
});

function EventsPage() {
  const events = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Calendar" title="Upcoming events on campus." />
      <Section>
        <div className="grid md:grid-cols-2 gap-5">
          {events.map((e: { id: string; day: string; month: string; title: string; venue: string; time: string }, i: number) => (
            <Reveal key={e.id} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-7 h-full hover:shadow-elegant transition-shadow">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gold-deep mb-4">
                  <Calendar className="size-3.5" /> {e.day} {e.month}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{e.title}</h3>
                <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-3"><MapPin className="size-3.5" /> {e.venue}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.time}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}