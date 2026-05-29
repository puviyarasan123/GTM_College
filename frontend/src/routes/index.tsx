import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import {
  ArrowRight, Award, BookOpen, Building2, Calendar, ChevronRight, GraduationCap,
  MapPin, Quote, Sparkles, Star, Trophy, Users,
} from "lucide-react";
import heroCampus from "@/assets/hero-campus.jpg";
import heroLibrary from "@/assets/hero-library.jpg";
import heroLab from "@/assets/hero-lab.jpg";
import aboutCampus from "@/assets/about-campus.jpg";
import {
  STATS, DEPARTMENTS, COURSES, RECRUITERS, PLACEMENT_HIGHLIGHTS,
  FACULTY, NEWS, EVENTS, TESTIMONIALS, FACILITIES,
} from "@/lib/site-data";
import { Reveal, Section, SectionHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GTM COLLEGE OF ARTS & SCIENCE — Empowering Minds, Shaping Futures" },
      { name: "description", content: "Premier Arts & Science College in Coimbatore. NAAC 'A' Grade, 92% placements, experienced faculty. Apply for 2025–26." },
      { property: "og:title", content: "GTM COLLEGE OF ARTS & SCIENCE" },
      { property: "og:description", content: "Empowering minds and shaping futures through quality education. Admissions open." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const heroSlides = [
  { img: heroCampus, eyebrow: "Admissions 2025–26 Open", title: "Empowering Minds, Shaping Futures.", sub: "Join GTM College of Arts & Science — a premier institution offering quality education in Science, Arts, Commerce and Management." },
  { img: heroLibrary, eyebrow: "NAAC 'A' Grade Accredited", title: "Where knowledge meets opportunity.", sub: "Extensive library resources, experienced faculty and a vibrant campus life to nurture your potential." },
  { img: heroLab, eyebrow: "Modern Laboratories", title: "Discover. Explore. Innovate.", sub: "Well-equipped science labs, computer centres and research facilities to fuel your academic journey." },
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
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[620px] overflow-hidden bg-primary-deep">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          effect="fade"
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-full"
        >
          {heroSlides.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full">
                <img src={s.img} alt="" className="absolute inset-0 size-full object-cover animate-kenburns" width={1920} height={1080} />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/90 via-primary-deep/70 to-primary-deep/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/80 to-transparent" />
                <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col justify-center">
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-[11px] font-bold uppercase tracking-[0.22em] backdrop-blur">
                      <Sparkles className="size-3.5" /> {s.eyebrow}
                    </span>
                    <h1 className="mt-6 text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight text-balance">
                      {s.title}
                    </h1>
                    <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">{s.sub}</p>
                    <div className="mt-10 flex flex-wrap gap-4">
                      <Link to="/admission" className="px-8 py-4 rounded-full bg-gold text-primary-deep font-bold shadow-gold hover:-translate-y-0.5 transition-all">
                        Apply Now
                      </Link>
                      <Link to="/courses" className="px-8 py-4 rounded-full glass-dark text-white font-bold hover:bg-white/10 transition-all">
                        Explore Programmes
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
          {["NAAC 'A' Grade", "Bharathiar University Affiliated", "UGC Recognised", "ISO 9001:2015", "AISHE Registered", "Govt. of Tamil Nadu Approved"].map((b) => (
            <span key={b} className="text-[11px] font-bold uppercase tracking-[0.25em]">{b}</span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <Section className="grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <img src={aboutCampus} alt="GTM campus" width={1600} height={1000} loading="lazy" className="rounded-3xl shadow-elegant w-full object-cover aspect-4/3" />
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-6 shadow-elegant w-56 hidden md:block">
              <div className="flex items-center gap-3"><Trophy className="size-6 text-gold-deep" /><div className="text-xs text-muted-foreground">Est. 1994</div></div>
              <div className="text-2xl font-extrabold text-primary mt-2">30+ Years</div>
              <div className="text-xs text-muted-foreground">of academic excellence</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeader eyebrow="About the Institute" title="A legacy of academic excellence since 1994." />
          <p className="text-muted-foreground leading-relaxed text-lg">
            GTM College of Arts & Science is a premier institution in Coimbatore, affiliated to Bharathiar University.
            We offer comprehensive UG and PG programmes in Science, Arts, Commerce and Management, nurturing
            students with quality education, modern infrastructure and strong placement support.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { i: Award, t: "NAAC 'A' Grade Accredited" },
              { i: Users, t: "180+ Qualified Faculty" },
              { i: Building2, t: "Spacious Green Campus" },
              { i: BookOpen, t: "10 Academic Departments" },
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
            <SectionHeader eyebrow="Academics" title="Departments built for your future." desc="Ten specialised departments across Science, Arts, Commerce and Management." />
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
        <SectionHeader eyebrow="Programmes" title="Courses offered." desc="Undergraduate and postgraduate programmes across Science, Arts, Commerce and Management." />
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
              <h2 className="text-4xl md:text-5xl font-extrabold text-balance">Top recruiters. Excellent career opportunities.</h2>
              <p className="mt-5 text-white/75 leading-relaxed max-w-md">
                Our students are placed in 180+ companies including TCS, Infosys, Wipro, Cognizant and leading banks.
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
          <SectionHeader eyebrow="Campus Life" title="Facilities that inspire." desc="A vibrant campus designed for learning, growth and holistic development." />
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
        <SectionHeader eyebrow="Mentors" title="Faculty highlights." desc="Experienced scholars and practitioners dedicated to student success." />
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
                <option>B.Sc. — Computer Science</option><option>B.Sc. — Mathematics</option><option>B.Com. — General</option><option>BBA</option><option>BCA</option><option>B.A. — English</option><option>M.Sc.</option><option>M.A.</option><option>M.Com.</option><option>Other</option>
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
