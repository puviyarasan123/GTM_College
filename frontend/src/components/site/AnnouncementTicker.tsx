import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { getAnnouncements } from "@/lib/content-fns";
import { TICKER } from "@/lib/site-data";
import { Marquee } from "@/components/site/Marquee";

const REFRESH_MS = 60_000;

export function AnnouncementTicker() {
  const [items, setItems] = useState<string[]>(TICKER);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const rows = await getAnnouncements();
        if (cancelled) return;
        // An empty table keeps the bundled defaults so the bar is never blank.
        setItems(rows.length > 0 ? rows.map((r) => r.text) : TICKER);
      } catch {
        // Keep whatever is on screen if the API is briefly unavailable.
      }
    }

    load();
    // Announcements are edited in the admin panel while visitors sit on the
    // page, so poll and re-check whenever the tab regains focus.
    const timer = setInterval(load, REFRESH_MS);
    window.addEventListener("focus", load);
    return () => {
      cancelled = true;
      clearInterval(timer);
      window.removeEventListener("focus", load);
    };
  }, []);

  if (items.length === 0) return null;

  // Longer lists need proportionally longer loops or they scroll too fast.
  const totalChars = items.reduce((n, t) => n + t.length, 0);
  const duration = Math.min(120, Math.max(25, Math.round(totalChars / 4)));

  return (
    <div className="bg-primary-deep text-primary-foreground border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-4 h-9">
        <div className="flex items-center gap-2 shrink-0 text-gold text-[11px] font-bold uppercase tracking-widest">
          <Megaphone className="size-3.5" />
          <span className="hidden sm:inline">Latest</span>
        </div>
        <Marquee durationSeconds={duration} className="flex-1" groupClassName="gap-12 pr-12">
          {items.map((text, i) => (
            <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap text-xs font-medium text-white/85">
              <span className="size-1 rounded-full bg-gold/70 shrink-0" />
              {text}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
