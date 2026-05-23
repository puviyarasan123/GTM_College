import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  ArrowRight, Award, BookOpen, Building2, Calendar, ChevronRight, GraduationCap,
  MapPin, Quote, Star, Trophy, Users,
} from "lucide-react";
import heroCampus from "@/assets/hero-campus.jpg";
import aboutCampus from "@/assets/about-campus.jpg";
import {
  STATS, DEPARTMENTS, COURSES, RECRUITERS, PLACEMENT_HIGHLIGHTS,
  FACULTY, NEWS, EVENTS, TESTIMONIALS, FACILITIES,
} from "@/lib/site-data";
import { Reveal, Section, SectionHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vidyutha Institute of Technology — Architects of the Future" },
      { name: "description", content: "Premier engineering institution. NAAC A++, 98% placements, 250+ PhD faculty, ₹54 LPA highest package. Apply for 2025–26." },
      { property: "og:title", content: "Vidyutha Institute of Technology" },
      { property: "og:description", content: "Engineering the future of global technology. Admissions open." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const HERO_STATS = [
  { v: "98.4%", l: "Placement Success" },
  { v: "₹54 LPA", l: "Highest Package" },
  { v: "500+", l: "Recruiters Yearly" },
  { v: "150+", l: "Research Patents" },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(value * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-primary">{n.toLocaleString()}{suffix}</div>;
}

function Index() {
  return (
    <div>
      {/* HERO — magazine geometric editorial */}
      <section className="relative bg-primary-deep py-6 lg:py-10">
        <div className="relative mx-auto w-full max-w-[1400px] px-4 lg:px-6">
          <div className="relative h-[760px] min-h-[680px] overflow-hidden rounded-[2.5rem] bg-primary-deep shadow-elegant">
            {/* Background image + gradients */}
            <div className="absolute inset-0">
              <img src={heroCampus} alt="" className="size-full object-cover opacity-40 animate-kenburns" width={1920} height={1080} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-deep via-primary-deep/40 to-transparent" />
            </div>

            {/* Magazine geometric accents */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute top-12 right-12 h-[80%] w-[42%] rounded-tr-[100px] border-t-2 border-r-2 border-gold/30" />
              <div className="absolute bottom-0 right-0 h-32 w-1/3 bg-gold/20 blur-3xl" />
              <div className="absolute top-1/4 right-[15%] h-64 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
              <div className="absolute top-1/3 right-[10%] h-96 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
              <div className="absolute -top-32 -left-32 size-[460px] rounded-full bg-primary-glow/30 blur-[140px] animate-glow" />
            </div>

            {/* Decorative grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "44px 44px" }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-center px-8 pb-40 lg:px-20 lg:pb-32 pt-16">
              {/* Header meta */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 flex flex-wrap items-center gap-4">
                <div className="h-[2px] w-12 bg-gold" />
                <div className="flex flex-wrap gap-2">
                  {["NAAC A++", "NBA Accredited", "AICTE Approved"].map((b) => (
                    <span key={b} className="rounded border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      {b}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="max-w-4xl">
                <h1 className="text-5xl font-extrabold uppercase tracking-tighter leading-[0.88] text-white text-balance md:text-7xl lg:text-[88px]">
                  Engineering
                  <br />
                  <span className="bg-gradient-to-br from-gold to-[oklch(0.86_0.14_88)] bg-clip-text text-transparent">
                    The Future
                  </span>
                  <span className="text-gold">.</span>
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 lg:text-xl">
                  Vidyutha Institute of Technology — nurturing world-class innovators through cutting-edge research, global partnerships and industry-integrated excellence since 1994.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link to="/admission" className="group relative overflow-hidden rounded-md bg-gold px-9 py-4 font-extrabold uppercase tracking-tight text-primary-deep shadow-gold transition-all hover:-translate-y-0.5">
                    <span className="relative z-10">Apply Now 2025</span>
                  </Link>
                  <Link to="/courses" className="rounded-md border border-white/30 px-9 py-4 font-bold uppercase tracking-tight text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                    Explore Programmes
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Bottom magazine stat strip */}
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 bg-gold text-primary-deep lg:grid-cols-4">
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.l}
                  className={`p-6 lg:p-7 ${i < HERO_STATS.length - 1 ? "border-r border-primary-deep/10" : ""}`}
                >
                  <div className="text-2xl font-black leading-none md:text-3xl">{s.v}</div>
                  <div className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] opacity-80">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Side rotated tagline */}
            <div className="absolute top-1/2 -right-2 hidden -translate-y-1/2 rotate-90 lg:block">
              <span className="text-[11px] font-bold uppercase tracking-[1em] text-gold/40">Est. 1994 • Excellence in Innovation</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-20 z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="glass rounded-3xl shadow-elegant grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden bg-border/40">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card p-8 text-center">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
              <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCREDITATIONS */}
      <section className="py-14">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-wrap justify-center items-center gap-x-14 gap-y-6 text-primary/60">
          {["NAAC A++", "AICTE Approved", "NBA Accredited", "NIRF Top 50", "UGC Recognised", "ISO 9001:2015"].map((b) => (
            <span key={b} className="text-[11px] font-bold uppercase tracking-[0.25em]">{b}</span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <Section className="grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <img src={aboutCampus} alt="Vidyutha campus" width={1600} height={1000} loading="lazy" className="rounded-3xl shadow-elegant w-full object-cover aspect-4/3" />
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-6 shadow-elegant w-56 hidden md:block">
              <div className="flex items-center gap-3"><Trophy className="size-6 text-gold-deep" /><div className="text-xs text-muted-foreground">Est. 1994</div></div>
              <div className="text-2xl font-extrabold text-primary mt-2">30+ Years</div>
              <div className="text-xs text-muted-foreground">of academic excellence</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeader eyebrow="About the Institute" title="A legacy of engineering excellence since 1994." />
          <p className="text-muted-foreground leading-relaxed text-lg">
            Vidyutha Institute of Technology stands as one of India's most ambitious engineering communities — combining
            rigorous academic foundations with industry-grade research, global partnerships and a relentless focus on
            student outcomes. Our 110-acre campus is home to 15,000+ learners across UG, PG and doctoral programmes.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { i: Award, t: "NAAC A++ Accredited" },
              { i: Users, t: "250+ PhD Faculty" },
              { i: Building2, t: "110-Acre Smart Campus" },
              { i: BookOpen, t: "8 Engineering Wings" },
            ].map(({ i: I, t }) => (
              <div key={t} className="flex items-center gap-3 p-4 rounded-2xl bg-secondary">
                <div className="size-10 rounded-xl bg-gradient-hero grid place-items-center text-gold"><I className="size-5" /></div>
                <span className="text-sm font-semibold text-primary">{t}</span>
              </div>
            ))}
          </div>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            Learn more about us <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </Section>

      {/* DEPARTMENTS */}
      <section className="bg-gradient-soft border-y border-border">
        <Section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader eyebrow="Academics" title="Departments built for industry 4.0." desc="Eight specialised wings, each led by PhD scholars and supported by industry-grade labs." />
            <Link to="/departments" className="text-sm font-bold text-gold-deep underline underline-offset-8 shrink-0">View all departments</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEPARTMENTS.map((d, i) => (
              <Reveal key={d.code} delay={i * 0.05}>
                <Link to="/departments" className="group block bg-card p-7 rounded-2xl shadow-card hover:shadow-elegant border border-border hover:border-gold/40 transition-all h-full">
                  <div className="size-12 rounded-xl bg-primary/5 grid place-items-center text-primary group-hover:bg-gradient-hero group-hover:text-gold transition-all">
                    <GraduationCap className="size-5" />
                  </div>
                  <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-deep">{d.code}</div>
                  <h3 className="mt-1 font-bold text-primary text-lg leading-tight">{d.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  <div className="mt-5 text-xs font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ChevronRight className="size-3.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      </section>

      {/* COURSES */}
      <Section>
        <SectionHeader eyebrow="Programmes" title="Courses offered." desc="From undergraduate to doctoral — pathways designed for every ambition." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <div className="p-7 rounded-2xl border border-border bg-card shadow-card h-full flex flex-col">
                <span className="self-start text-[10px] font-bold uppercase tracking-[0.2em] text-gold-deep">{c.level}</span>
                <h3 className="mt-3 text-xl font-extrabold text-primary">{c.title}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.branches.slice(0, 5).map((b) => (
                    <span key={b} className="text-[11px] px-2 py-1 rounded-md bg-secondary text-primary font-semibold">{b}</span>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-border flex justify-between text-xs">
                  <div><div className="text-muted-foreground">Duration</div><div className="font-bold text-primary mt-0.5">{c.duration}</div></div>
                  <div className="text-right"><div className="text-muted-foreground">Seats</div><div className="font-bold text-primary mt-0.5">{c.seats}</div></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PLACEMENTS */}
      <section className="bg-primary-deep text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-20 -left-20 size-[400px] bg-gold/15 rounded-full blur-[140px]" />
        <Section className="relative">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold mb-3">Placements 2024</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-balance">Global recruiters. Record-breaking offers.</h2>
              <p className="mt-5 text-white/75 leading-relaxed max-w-md">
                Our students are sought after by 450+ companies including Google, Microsoft, Amazon and JP Morgan.
              </p>
              <Link to="/placement" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-primary-deep font-bold hover:-translate-y-0.5 transition-transform">
                View placement stats <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="lg:col-span-3 grid grid-cols-2 gap-4">
              {PLACEMENT_HIGHLIGHTS.map((h) => (
                <div key={h.label} className="glass-dark rounded-2xl p-6">
                  <div className="text-3xl md:text-4xl font-extrabold text-gold">{h.value}</div>
                  <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Recruiter marquee */}
          <div className="mt-16 pt-10 border-t border-white/10 overflow-hidden">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6">Trusted by leading recruiters</p>
            <div className="flex animate-marquee gap-12 whitespace-nowrap">
              {[...RECRUITERS, ...RECRUITERS].map((r, i) => (
                <span key={i} className="text-xl md:text-2xl font-extrabold tracking-tight text-white/40 hover:text-gold transition-colors">{r}</span>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* NEWS + EVENTS */}
      <Section className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <SectionHeader eyebrow="Newsroom" title="Latest news & announcements." />
          <div className="space-y-4">
            {NEWS.slice(0, 4).map((n, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <Link to="/news" className="block group p-6 rounded-2xl border border-border hover:border-gold/40 bg-card hover:shadow-elegant transition-all">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-deep">
                    <span>{n.date}</span><span className="size-1 rounded-full bg-border" /><span>{n.category}</span>
                  </div>
                  <h3 className="mt-2 font-bold text-primary text-lg leading-snug group-hover:text-primary-glow">{n.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{n.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="What's on" title="Upcoming events." />
          <div className="space-y-3">
            {EVENTS.map((e, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="p-5 rounded-2xl bg-secondary flex gap-4 items-center hover:bg-primary/5 transition-colors">
                  <div className="shrink-0 size-16 rounded-xl bg-gradient-hero text-primary-foreground grid place-items-center text-center">
                    <div><div className="text-xl font-extrabold leading-none">{e.date.d}</div><div className="text-[10px] text-gold font-bold tracking-widest mt-0.5">{e.date.m}</div></div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-primary text-sm leading-tight">{e.title}</h4>
                    <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2"><Calendar className="size-3" />{e.time}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2"><MapPin className="size-3" />{e.venue}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* FACILITIES */}
      <section className="bg-gradient-soft border-y border-border">
        <Section>
          <SectionHeader eyebrow="Campus Life" title="Facilities that inspire." desc="A 110-acre sanctuary of learning, research and student life." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACILITIES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="p-7 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all h-full">
                  <div className="size-12 rounded-xl bg-gradient-gold grid place-items-center text-primary-deep"><Star className="size-5" /></div>
                  <h3 className="mt-5 font-bold text-primary text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </section>

      {/* FACULTY HIGHLIGHTS */}
      <Section>
        <SectionHeader eyebrow="Mentors" title="Faculty highlights." desc="Scholars, researchers and practitioners shaping tomorrow's engineers." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACULTY.slice(0, 6).map((f, i) => (
            <Reveal key={f.name} delay={i * 0.04}>
              <div className="p-6 rounded-2xl border border-border bg-card hover:shadow-elegant transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-gradient-hero grid place-items-center text-gold font-extrabold text-lg">
                    {f.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-primary leading-tight">{f.name}</h4>
                    <div className="text-xs text-muted-foreground">{f.role}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border text-xs space-y-1">
                  <div className="text-muted-foreground">{f.qual}</div>
                  <div className="font-semibold text-primary">Focus — {f.focus}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <section className="bg-gradient-soft border-y border-border">
        <Section>
          <SectionHeader eyebrow="Alumni voices" title="Stories from our graduates." />
          <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000 }} pagination={{ clickable: true }} loop spaceBetween={24} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} className="pb-12">
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="p-7 rounded-2xl bg-card border border-border shadow-card h-full">
                  <Quote className="size-7 text-gold-deep/40" />
                  <p className="mt-4 text-sm text-foreground leading-relaxed">{t.quote}</p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="font-bold text-primary text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.batch}</div>
                    <div className="text-xs text-gold-deep font-semibold mt-1">{t.company}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Section>
      </section>

      {/* ADMISSION CTA + ENQUIRY */}
      <Section>
        <div className="rounded-[2rem] bg-gradient-hero text-primary-foreground p-10 md:p-16 relative overflow-hidden shadow-elegant">
          <div className="absolute -top-20 -right-20 size-80 bg-gold/20 rounded-full blur-3xl animate-glow" />
          <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold mb-4">Admissions 2025–26</div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-balance">Your future starts with one application.</h2>
              <p className="mt-5 text-white/80 max-w-md leading-relaxed">Talk to our admissions team, book a campus visit, or submit your enquiry — we'll respond within one working day.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/admission" className="px-7 py-3.5 rounded-full bg-gold text-primary-deep font-bold hover:-translate-y-0.5 transition-transform">Apply Now</Link>
                <Link to="/contact" className="px-7 py-3.5 rounded-full glass-dark text-white font-bold">Contact Us</Link>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="bg-card text-foreground rounded-2xl p-7 shadow-elegant space-y-4">
              <h3 className="font-extrabold text-primary text-lg">Quick Enquiry</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <input className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-hidden focus:ring-2 focus:ring-gold" placeholder="Full name" />
                <input className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-hidden focus:ring-2 focus:ring-gold" placeholder="Mobile" />
              </div>
              <input className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-hidden focus:ring-2 focus:ring-gold" placeholder="Email" />
              <select className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-hidden focus:ring-2 focus:ring-gold">
                <option>B.Tech — Computer Science</option><option>B.Tech — ECE</option><option>B.Tech — Mechanical</option><option>MBA</option><option>MCA</option><option>Other</option>
              </select>
              <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-hidden focus:ring-2 focus:ring-gold" placeholder="Tell us briefly what you'd like to know" />
              <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-hero text-primary-foreground font-bold hover:opacity-95">Submit Enquiry</button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}
