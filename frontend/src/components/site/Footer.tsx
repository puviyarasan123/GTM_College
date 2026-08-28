import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site-data";

const cols = [
  {
    title: "Academics",
    links: [
      { label: "Courses", to: "/courses" },
      { label: "Departments", to: "/departments" },
      { label: "Faculty", to: "/faculty" },
      { label: "Library", to: "/library" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "Apply Now", to: "/admission" },
      { label: "Placements", to: "/placement" },
      { label: "Student Login", to: "/student/login" },
      { label: "Admin Login", to: "/admin/login" },
    ],
  },
  {
    title: "Campus",
    links: [
      { label: "Infrastructure", to: "/infrastructure" },
      { label: "Hostel", to: "/hostel" },
      { label: "Transport", to: "/transport" },
      { label: "Gallery", to: "/gallery" },
    ],
  },
  {
    title: "Institute",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Vision & Mission", to: "/vision-mission" },
      { label: "News", to: "/news" },
      { label: "Events", to: "/events" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-primary-deep text-primary-foreground overflow-hidden w-full">
      <div className="absolute top-0 left-1/4 size-[500px] bg-gold/10 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 size-[400px] bg-primary-glow/30 rounded-full blur-[140px] translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-4">
            <Link to="/" className="block">
              <img
                src="/logonew.png"
                alt="Govt. Thirumagal Mills College"
                className="h-14 w-auto"
                style={{ imageRendering: "high-quality" as const } as unknown as React.CSSProperties}
                decoding="async"
              />
            </Link>
            <p className="mt-6 text-sm text-white/70 leading-relaxed max-w-sm">
              A premier Arts & Science institution dedicated to quality education, holistic student development and academic excellence since {SITE.estd}.
            </p>
            <div className="mt-6 flex gap-3">
              {["FB","X","IG","IN","YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="size-9 rounded-full grid place-items-center bg-white/5 hover:bg-gold hover:text-primary-deep transition-colors text-[10px] font-bold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-5">
                {c.title}
              </h5>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1 group"
                    >
                      {l.label}
                      <ArrowRight className="size-3 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 py-10 border-b border-white/10">
          <div className="flex items-start gap-3">
            <MapPin className="size-5 text-gold shrink-0 mt-0.5" />
            <p className="text-sm text-white/80 leading-relaxed">{SITE.address}</p>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="size-5 text-gold shrink-0 mt-0.5" />
            <a href={`tel:${SITE.phone}`} className="text-sm text-white/80 hover:text-white">
              {SITE.phone}
            </a>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="size-5 text-gold shrink-0 mt-0.5" />
            <a href={`mailto:${SITE.email}`} className="text-sm text-white/80 hover:text-white">
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-white/50">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}