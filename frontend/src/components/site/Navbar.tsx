import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, GraduationCap, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV, SITE } from "@/lib/site-data";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const path = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActive(null);
  }, [path]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-xl shadow-card" : "bg-background/70 backdrop-blur-md"
      } border-b border-border/60`}
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className={`flex items-center justify-between transition-all ${scrolled ? "h-16" : "h-20"}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="size-11 rounded-xl bg-gradient-hero grid place-items-center text-gold shadow-elegant group-hover:scale-105 transition-transform">
                <GraduationCap className="size-6" strokeWidth={2} />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gold/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-extrabold text-primary tracking-tight">GTM</div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                ARTS & SCIENCE
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setActive(null)}>
            {NAV.map((item) => {
              const isActive = path === item.to || (item.children && item.children.some((c) => c.to === path));
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActive(item.label)}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="size-3.5 opacity-60" />}
                  </Link>
                  <AnimatePresence>
                    {item.children && active === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                      >
                        <div className="w-[360px] glass rounded-2xl shadow-elegant p-2 border border-border/60">
                          {item.children.map((c) => (
                            <Link
                              key={c.to}
                              to={c.to}
                              className="block p-3 rounded-xl hover:bg-primary/5 transition-colors group/item"
                            >
                              <div className="text-sm font-semibold text-primary group-hover/item:text-primary-glow">
                                {c.label}
                              </div>
                              {c.desc && <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <button
              aria-label="Search"
              className="size-10 rounded-full grid place-items-center text-foreground/70 hover:bg-secondary transition-colors"
            >
              <Search className="size-4" />
            </button>
            <a
              href="/student/login"
              className="text-sm font-semibold text-primary/80 hover:text-primary px-3"
            >
              Login
            </a>
            <Link
              to="/admission"
              className="px-5 py-2.5 rounded-full bg-gradient-hero text-primary-foreground text-sm font-bold shadow-elegant hover:shadow-gold hover:-translate-y-0.5 transition-all"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden size-10 grid place-items-center rounded-full bg-secondary text-primary"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-border/40 last:border-0 py-1">
                  <Link
                    to={item.to}
                    className="block py-2.5 text-sm font-bold text-primary"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-3 pb-2 space-y-1">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 flex gap-2">
                <a href="/student/login" className="flex-1 text-center py-2.5 rounded-full border border-border text-sm font-semibold">
                  Login
                </a>
                <Link to="/admission" className="flex-1 text-center py-2.5 rounded-full bg-gradient-hero text-primary-foreground text-sm font-bold">
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export { SITE };