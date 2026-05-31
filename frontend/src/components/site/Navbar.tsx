// import { useState, useEffect } from "react";
// import { Link, useRouterState } from "@tanstack/react-router";
// import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { NAV } from "@/lib/site-data";

// export function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [active, setActive] = useState<string | null>(null);
//   const [scrolled, setScrolled] = useState(false);
//   const path = useRouterState({ select: (r) => r.location.pathname });

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     setOpen(false);
//     setActive(null);
//   }, [path]);

//   return (
//     <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "shadow-elegant" : ""}`}>

//       {/* ── Row 1: Logo banner ── */}
//       <div className="bg-white border-b border-border/40">
//         <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3">
//           <Link to="/">
//             <img
//               src="/logonew.png"
//               alt="Govt. Thirumagal Mills College"
//               className="h-20 md:h-28 w-auto"
//               style={{ imageRendering: "high-quality" }}
//               decoding="async"
//               fetchPriority="high"
//             />
//           </Link>
//         </div>
//       </div>

//       {/* ── Row 2: Nav + contact + actions ── */}
//       <div className="bg-primary text-primary-foreground hidden lg:block" onMouseLeave={() => setActive(null)}>
//         <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between">

//           {/* Nav links */}
//           <nav className="flex items-center">
//             {NAV.map((item) => {
//               const isActive = path === item.to || (item.children?.some((c) => c.to === path));
//               return (
//                 <div key={item.label} className="relative" onMouseEnter={() => item.children && setActive(item.label)}>
//                   <Link
//                     to={item.to}
//                     className={`flex items-center gap-1 px-4 py-3.5 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
//                       isActive ? "border-gold text-gold" : "border-transparent text-white/90 hover:text-gold hover:border-gold/50"
//                     }`}
//                   >
//                     {item.label}
//                     {item.children && <ChevronDown className="size-3 opacity-70" />}
//                   </Link>

//                   <AnimatePresence>
//                     {item.children && active === item.label && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 6 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 6 }}
//                         transition={{ duration: 0.15 }}
//                         className="absolute left-0 top-full pt-1 z-50"
//                       >
//                         <div className="w-[270px] bg-white rounded-2xl shadow-elegant p-2 border border-border">
//                           {item.children.map((c) => (
//                             <Link key={c.to} to={c.to} className="block p-3 rounded-xl hover:bg-primary/5 transition-colors">
//                               <div className="text-sm font-semibold text-primary">{c.label}</div>
//                               {c.desc && <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>}
//                             </Link>
//                           ))}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </nav>

//           {/* Contact + actions */}
//           <div className="flex items-center gap-4 pl-4 border-l border-white/20 shrink-0">
//             <div className="flex flex-col gap-0.5 text-right">
//               <span className="text-[11px] text-white/70 flex items-center gap-1 justify-end">
//                 <Phone className="size-3" /> 04171-220162
//               </span>
//               <span className="text-[11px] text-white/70 flex items-center gap-1 justify-end">
//                 <Mail className="size-3" /> principal@gtmc.edu.in
//               </span>
//               <span className="text-[10px] text-white/50">Gudiyattam, Vellore – 632 602</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <a
//                 href="/student/login"
//                 className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 text-white hover:bg-white hover:text-primary transition-colors whitespace-nowrap"
//               >
//                 Student Login
//               </a>
//               <Link
//                 to="/admission"
//                 className="text-xs font-bold px-3 py-1.5 rounded-full bg-gold text-primary-deep hover:opacity-90 transition-opacity whitespace-nowrap"
//               >
//                 Apply Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Mobile: logo row already shown, hamburger here ── */}
//       <div className="lg:hidden bg-primary px-4 py-2 flex items-center justify-between">
//         <span className="text-xs text-white/70 font-medium">Gudiyattam – 632 602</span>
//         <button
//           onClick={() => setOpen((v) => !v)}
//           className="size-9 grid place-items-center rounded-full bg-white/10 text-white"
//           aria-label="Toggle menu"
//         >
//           {open ? <X className="size-5" /> : <Menu className="size-5" />}
//         </button>
//       </div>

//       {/* ── Mobile menu ── */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="lg:hidden overflow-hidden bg-background border-t border-border"
//           >
//             <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
//               {NAV.map((item) => (
//                 <div key={item.label} className="border-b border-border/40 last:border-0 py-1">
//                   <Link to={item.to} className="block py-2.5 text-sm font-bold text-primary">{item.label}</Link>
//                   {item.children && (
//                     <div className="pl-3 pb-2 space-y-1">
//                       {item.children.map((c) => (
//                         <Link key={c.to} to={c.to} className="block py-1.5 text-sm text-muted-foreground hover:text-primary">{c.label}</Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div className="pt-3 space-y-2 text-xs text-muted-foreground">
//                 <div className="flex items-center gap-2"><Phone className="size-3" /> 04171-220162</div>
//                 <div className="flex items-center gap-2"><Mail className="size-3" /> principal@gtmc.edu.in</div>
//               </div>
//               <div className="pt-3 flex gap-2">
//                 <a href="/student/login" className="flex-1 text-center py-2.5 rounded-full border border-border text-sm font-semibold">Login</a>
//                 <Link to="/admission" className="flex-1 text-center py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">Apply Now</Link>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }


import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "@/lib/site-data";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActive(null);
  }, [path]);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "shadow-elegant" : ""}`}>

      {/* ── Row 1: Logo banner ── */}
      <div className="bg-white border-b border-border/40">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3">
          <Link to="/">
            <img
              src="/logonew.png"
              alt="Govt. Thirumagal Mills College"
              className="h-20 md:h-28 w-auto"
              style={{ imageRendering: "high-quality" }}
              decoding="async"
              fetchPriority="high"
            />
          </Link>
        </div>
      </div>

      {/* ── Row 2: Nav + contact + actions ── */}
      <div className="bg-primary text-primary-foreground hidden lg:block" onMouseLeave={() => setActive(null)}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between">

          {/* Nav links */}
          <nav className="flex items-center">
            {NAV.map((item) => {
              const isActive = path === item.to || (item.children?.some((c) => c.to === path));
              return (
                <div key={item.label} className="relative" onMouseEnter={() => item.children && setActive(item.label)}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-1 px-4 py-3.5 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                      isActive ? "border-gold text-gold" : "border-transparent text-white/90 hover:text-gold hover:border-gold/50"
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="size-3 opacity-70" />}
                  </Link>

                  <AnimatePresence>
                    {item.children && active === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full pt-1 z-50"
                      >
                        <div className="w-[270px] bg-white rounded-2xl shadow-elegant p-2 border border-border">
                          {item.children.map((c) => 
                            // 🌟 DESKTOP SNAP-IN ROUTING INJECTION:
                            'isExternal' in c && c.isExternal ? (
                              <a 
                                key={c.to}
                                href={c.to} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block p-3 rounded-xl hover:bg-primary/5 transition-colors"
                              >
                                <div className="font-semibold text-sm text-primary">{c.label}</div>
                                {c.desc && <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>}
                              </a>
                            ) : (
                              <Link 
                                key={c.to} 
                                to={c.to} 
                                className="block p-3 rounded-xl hover:bg-primary/5 transition-colors"
                              >
                                <div className="font-semibold text-sm text-primary">{c.label}</div>
                                {c.desc && <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>}
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

          {/* Contact + actions */}
          <div className="flex items-center gap-4 pl-4 border-l border-white/20 shrink-0">
            <div className="flex flex-col gap-0.5 text-right">
              <span className="text-[11px] text-white/70 flex items-center gap-1 justify-end">
                <Phone className="size-3" /> 04171-220162
              </span>
              <span className="text-[11px] text-white/70 flex items-center gap-1 justify-end">
                <Mail className="size-3" /> principal@gtmc.edu.in
              </span>
              <span className="text-[10px] text-white/50">Gudiyattam, Vellore – 632 602</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/student/login"
                className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 text-white hover:bg-white hover:text-primary transition-colors whitespace-nowrap"
              >
                Student Login
              </a>
              <Link
                to="/admission"
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-gold text-primary-deep hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: logo row already shown, hamburger here ── */}
      <div className="lg:hidden bg-primary px-4 py-2 flex items-center justify-between">
        <span className="text-xs text-white/70 font-medium">Gudiyattam – 632 602</span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="size-9 grid place-items-center rounded-full bg-white/10 text-white"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-border/40 last:border-0 py-1">
                  <Link to={item.to} className="block py-2.5 text-sm font-bold text-primary">{item.label}</Link>
                  {item.children && (
                    <div className="pl-3 pb-2 space-y-1">
                      {item.children.map((c) => 
                        // 🌟 MOBILE REPLICATED ROUTING FOR STABLE EXITS:
                        'isExternal' in c && c.isExternal ? (
                          <a 
                            key={c.to} 
                            href={c.to}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="block py-1.5 text-sm text-muted-foreground hover:text-primary font-medium"
                          >
                            {c.label} ↗
                          </a>
                        ) : (
                          <Link 
                            key={c.to} 
                            to={c.to} 
                            className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                          >
                            {c.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Phone className="size-3" /> 04171-220162</div>
                <div className="flex items-center gap-2"><Mail className="size-3" /> principal@gtmc.edu.in</div>
              </div>
              <div className="pt-3 flex gap-2">
                <a href="/student/login" className="flex-1 text-center py-2.5 rounded-full border border-border text-sm font-semibold">Login</a>
                <Link to="/admission" className="flex-1 text-center py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">Apply Now</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}