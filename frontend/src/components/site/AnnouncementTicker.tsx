import { Megaphone } from "lucide-react";
import { getAnnouncements } from "@/lib/content-fns";
import { TICKER } from "@/lib/site-data";
import { useEffect, useState } from "react";

export function AnnouncementTicker() {
  const [dbItems, setDbItems] = useState<string[] | null>(null);

  useEffect(() => {
    getAnnouncements().then((rows: Array<{ text: string }>) => {
      if (rows.length > 0) setDbItems(rows.map((r) => r.text));
    }).catch(() => {});
  }, []);

  const source = dbItems ?? TICKER;
  const items = [...source, ...source];
  return (
    <div className="bg-primary-deep text-primary-foreground border-b border-white/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-4 h-9">
        <div className="flex items-center gap-2 shrink-0 text-gold text-[11px] font-bold uppercase tracking-widest">
          <Megaphone className="size-3.5" />
          <span className="hidden sm:inline">Latest</span>
        </div>
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="inline-flex animate-marquee gap-12 text-xs font-medium text-white/85">
            {items.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="size-1 rounded-full bg-gold/70" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}