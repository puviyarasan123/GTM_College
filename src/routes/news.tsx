import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE, NEWS as STATIC_NEWS } from "@/lib/site-data";
import { getNews } from "@/lib/content-fns";

export const Route = createFileRoute("/news")({
  loader: async () => {
    try {
      const rows = await getNews();
      if (rows.length > 0) return rows;
    } catch {}
    return STATIC_NEWS.map((n, i) => ({ id: String(i), date: n.date, category: n.category, title: n.title, excerpt: n.excerpt, published: true, createdAt: new Date(), updatedAt: new Date() }));
  },
  head: () => ({
    meta: [
      { title: `News & Announcements — ${SITE.name}` },
      { name: "description", content: "Latest news, accreditations, research milestones and campus updates." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  const news = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Newsroom" title="What is happening on campus." />
      <Section>
        <div className="space-y-5">
          {news.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.05}>
              <article className="grid md:grid-cols-[180px_1fr] gap-6 rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition-shadow">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-deep">{n.category}</div>
                  <div className="text-sm text-muted-foreground mt-1">{n.date}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary leading-snug">{n.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{n.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}