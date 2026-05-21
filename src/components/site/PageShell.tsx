import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,oklch(0.78_0.13_85/.5),transparent_50%)]" />
      <div className="absolute -top-32 -right-32 size-[500px] bg-gold/10 rounded-full blur-[120px]" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 py-24 md:py-32">
        {eyebrow && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold mb-4">
            {eyebrow}
          </motion.div>
        )}
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance max-w-3xl">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-lg text-white/75 max-w-2xl leading-relaxed">
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`max-w-[1400px] mx-auto px-6 lg:px-8 py-20 md:py-28 ${className}`}>{children}</section>;
}

export function SectionHeader({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <div className="max-w-3xl mb-12">
      {eyebrow && <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-deep mb-3">{eyebrow}</div>}
      <h2 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight text-balance">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{desc}</p>}
    </div>
  );
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}