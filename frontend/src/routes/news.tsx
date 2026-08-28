import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { getNews } from "@/lib/content-fns";
import type { Attachment, NewsItem } from "@/lib/content-fns";
import { SITE } from "@/lib/site-data";
import { ChevronDown, Download, FileText, ImageIcon, Newspaper } from "lucide-react";

export const Route = createFileRoute("/news")({
  loader: async (): Promise<NewsItem[]> => {
    try {
      return await getNews();
    } catch {
      return [];
    }
  },
  head: () => ({
    meta: [
      { title: `News & Announcements — ${SITE.name}` },
      { name: "description", content: "Latest news, notices and announcements from Govt. Thirumagal Mills College, Gudiyattam." },
    ],
  }),
  component: NewsPage,
});

function isImage(file: Attachment) {
  return file.type?.startsWith("image/") || /\.(jpe?g|png|webp|gif)$/i.test(file.url);
}

function AttachmentList({ files }: { files: Attachment[] }) {
  return (
    <div className="mt-5 pt-4 border-t border-border space-y-2">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {files.length} attachment{files.length === 1 ? "" : "s"}
      </div>
      <div className="flex flex-wrap gap-2">
        {files.map((file, i) => {
          const Icon = isImage(file) ? ImageIcon : FileText;
          return (
            <a
              key={`${file.url}-${i}`}
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-secondary/60 text-xs font-semibold text-primary hover:border-gold/50 hover:bg-secondary transition-colors"
            >
              <Icon className="size-3.5 text-gold-deep" />
              <span className="max-w-[220px] truncate">{file.name || "Attachment"}</span>
              <Download className="size-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const [open, setOpen] = useState(false);
  const files = (item.attachments ?? []) as Attachment[];
  const paragraphs = (item.content ?? "").split(/\n{2,}/).filter((p) => p.trim());
  const expandable = paragraphs.length > 0;

  return (
    <Reveal delay={Math.min(index * 0.05, 0.3)}>
      <article className="grid md:grid-cols-[180px_1fr] gap-6 rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition-shadow">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gold-deep">{item.category}</div>
          <div className="text-sm text-muted-foreground mt-1">{item.date}</div>
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-primary leading-snug">{item.title}</h3>
          <p className="text-muted-foreground mt-2 leading-relaxed">{item.excerpt}</p>

          <AnimatePresence initial={false}>
            {open && expandable && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3 text-sm text-foreground/90 leading-relaxed">
                  {paragraphs.map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {expandable && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2.5 transition-all"
            >
              {open ? "Show less" : "Read full message"}
              <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          )}

          {files.length > 0 && <AttachmentList files={files} />}
        </div>
      </article>
    </Reveal>
  );
}

function NewsPage() {
  const news = Route.useLoaderData() as NewsItem[];
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(news.map((n) => n.category).filter(Boolean)))],
    [news],
  );
  const visible = category === "All" ? news : news.filter((n) => n.category === category);

  return (
    <>
      <PageHero eyebrow="Newsroom" title="What is happening on campus." />
      <Section>
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                  category === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-gold/50 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-5">
          {visible.map((item, i) => <NewsCard key={item.id} item={item} index={i} />)}
        </div>

        {visible.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
            <Newspaper className="size-8 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">
              {news.length === 0 ? "No news has been published yet. Please check back soon." : `Nothing filed under “${category}” yet.`}
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
