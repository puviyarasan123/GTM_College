import { createFileRoute } from "@tanstack/react-router";
import { getAllNews } from "@/lib/content-fns";
import { getAllEvents } from "@/lib/content-fns";
import { getAllAnnouncements } from "@/lib/content-fns";
import { listUsers } from "@/lib/admin-fns";
import { Newspaper, Calendar, Megaphone, Users, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/dashboard")({
  loader: async () => {
    const [news, events, announcements, users] = await Promise.all([
      getAllNews(),
      getAllEvents(),
      getAllAnnouncements(),
      listUsers(),
    ]);
    return { news, events, announcements, users };
  },
  component: Dashboard,
});

function Dashboard() {
  const { news, events, announcements, users } = Route.useLoaderData();

  const stats = [
    { label: "News Articles", value: news.length, icon: Newspaper, color: "text-blue-500" },
    { label: "Events", value: events.length, icon: Calendar, color: "text-green-500" },
    { label: "Announcements", value: announcements.length, icon: Megaphone, color: "text-yellow-500" },
    { label: "Admin Users", value: users.length, icon: Users, color: "text-purple-500" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your college site content</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <div className="flex items-center justify-between mb-3">
              <Icon className={`size-5 ${color}`} />
              <TrendingUp className="size-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-extrabold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="font-bold text-foreground mb-4">Recent News</h2>
          <div className="space-y-3">
            {news.slice(0, 5).map((n: { id: string; title: string; published: boolean; date: string; category: string }) => (
              <div key={n.id} className="flex items-start gap-3 text-sm">
                <span className={`mt-0.5 size-2 rounded-full shrink-0 ${n.published ? "bg-green-500" : "bg-gray-300"}`} />
                <div className="min-w-0">
                  <div className="font-medium text-foreground truncate">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.date} · {n.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="font-bold text-foreground mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {events.slice(0, 5).map((e: { id: string; day: string; month: string; title: string; venue: string }) => (
              <div key={e.id} className="flex items-start gap-3 text-sm">
                <div className="shrink-0 size-10 rounded-xl bg-primary/5 grid place-items-center text-center">
                  <div className="text-xs font-extrabold text-primary leading-none">{e.day}</div>
                  <div className="text-[9px] text-gold-deep font-bold">{e.month}</div>
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-foreground truncate">{e.title}</div>
                  <div className="text-xs text-muted-foreground">{e.venue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
