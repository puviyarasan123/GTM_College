import { useState, useEffect, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "@/lib/site-data";
import { useQuery } from "@tanstack/react-query";
import { getDynamicSections } from "@/lib/content-fns";
import type { DynamicSection } from "@/lib/content-fns";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: iqacItems = [] } = useQuery({ queryKey: ["nav-iqac"], queryFn: () => getDynamicSections("iqac"), staleTime: 60000 });
  const { data: nirfItems = [] } = useQuery({ queryKey: ["nav-nirf"], queryFn: () => getDynamicSections("nirf"), staleTime: 60000 });
  const { data: aqarItems = [] } = useQuery({ queryKey: ["nav-aqar"], queryFn: () => getDynamicSections("aqar"), staleTime: 60000 });

  function buildChildren(items: DynamicSection[], prefix: string) {
    return items.map((s) => ({ label: s.title, to: `/${prefix}/${s.slug}`, desc: s.subtitle }));
  }

  const dynamicNav = NAV.map((item) => {
    if (item.label === "IQAC" && iqacItems.length > 0) return { ...item, children: buildChildren(iqacItems, "iqac") };
    if (item.label === "NIRF" && nirfItems.length > 0) return { ...item, children: buildChildren(nirfItems, "nirf") };
    if (item.label === "AQAR" && aqarItems.length > 0) return { ...item, children: buildChildren(aqarItems, "aqar") };
    return item;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setActive(null);
  }, [path]);

  function handleMouseEnter(label: string) {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(label);
  }

  function handleMouseLeave() {
    leaveTimer.current = setTimeout(() => setActive(null), 120);
  }

  function toggleMobileItem(label: string) {
    setMobileExpanded((v) => (v === label ? null : label));
  }

  return (
    <header className={`sticky top-0 z-40 w-full transition-shadow duration-300 ${scrolled ? "shadow-elegant" : ""}`}>

      {/* ── Logo row: full width image + buttons overlaid on right ── */}
      <div className="relative w-full bg-white border-b border-border/40 overflow-hidden">
        {/* Logo fills full width */}
        <Link to="/" className="block w-full">
          <img
            src="/logonew.png"
            alt="Govt. Thirumagal Mills College"
            className="w-full h-auto block"
            style={{ imageRendering: "high-quality", maxHeight: "120px", objectFit: "cover", objectPosition: "left center" }}
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        {/* Buttons overlaid on the right of the logo — desktop only */}
        <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-stretch gap-2">
          <a
            href="/student/login"
            className="text-sm font-semibold px-5 py-2 rounded-full border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white transition-colors whitespace-nowrap shadow-sm text-center"
          >
            Student Login
          </a>
          <Link
            to="/admission"
            className="text-sm font-semibold px-5 py-2 rounded-full bg-gold text-primary-deep hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm text-center"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile hamburger overlaid on right */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full bg-primary text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* ── Desktop nav bar — single row ── */}
      <div className="bg-primary text-primary-foreground hidden lg:block w-full">
        <div className="w-full px-2 xl:px-4">
          <nav className="flex items-center justify-between flex-nowrap w-full">
            {dynamicNav.map((item) => {
              const isActive = path === item.to || item.children?.some((c) => c.to === path);
              const isOpen = active === item.label;

              return (
                <div
                  key={item.label}
                  className="relative flex-1 text-center"
                  onMouseEnter={() => item.children ? handleMouseEnter(item.label) : setActive(null)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center justify-center gap-0.5 px-1 py-3 text-[11px] xl:text-[12px] font-semibold transition-colors border-b-2 whitespace-nowrap w-full ${
                      isActive
                        ? "border-gold text-gold"
                        : "border-transparent text-white/90 hover:text-gold hover:border-gold/50"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={`size-3 opacity-70 shrink-0 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.13 }}
                        onMouseEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }}
                        onMouseLeave={handleMouseLeave}
                        className="absolute top-full left-0 pt-1 z-50"
                      >
                        <div className="w-56 bg-white rounded-2xl shadow-elegant border border-border p-1.5 max-h-[70vh] overflow-y-auto">
                          {item.children.map((c) =>
                            "isExternal" in c && c.isExternal ? (
                              <a
                                key={c.to}
                                href={c.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-3 py-2 rounded-xl hover:bg-primary/5 transition-colors text-sm font-semibold text-primary"
                              >
                                {c.label} ↗
                              </a>
                            ) : (
                              <Link
                                key={c.to}
                                to={c.to}
                                className="block px-3 py-2 rounded-xl hover:bg-primary/5 transition-colors text-sm font-semibold text-primary"
                              >
                                {c.label}
                              </Link>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-background border-t border-border w-full"
          >
            <div className="max-h-[78vh] overflow-y-auto divide-y divide-border/40">
              {dynamicNav.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMobileItem(item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-primary"
                      >
                        {item.label}
                        <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-200 ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileExpanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden bg-secondary/40"
                          >
                            <div className="px-4 py-2 space-y-0.5">
                              {item.children.map((c) =>
                                "isExternal" in c && c.isExternal ? (
                                  <a
                                    key={c.to}
                                    href={c.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block py-2 px-2 text-sm text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
                                  >
                                    {c.label} ↗
                                  </a>
                                ) : (
                                  <Link
                                    key={c.to}
                                    to={c.to}
                                    className="block py-2 px-2 text-sm text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
                                  >
                                    {c.label}
                                  </Link>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.to}
                      className="block px-4 py-3 text-sm font-bold text-primary"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="px-4 py-4 flex gap-3">
                <a
                  href="/student/login"
                  className="flex-1 text-center py-2.5 rounded-full border border-border text-sm font-semibold text-foreground"
                >
                  Student Login
                </a>
                <Link
                  to="/admission"
                  className="flex-1 text-center py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold"
                >
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
