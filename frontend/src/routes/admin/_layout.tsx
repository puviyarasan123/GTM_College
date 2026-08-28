import { createFileRoute, Outlet, redirect, Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminSession, adminLogout } from "@/lib/admin-fns";
import {
  LayoutDashboard, Users, Newspaper, Calendar, Megaphone,
  Settings, LogOut, GraduationCap, ChevronRight, FileText, UserCircle, ImageIcon, BookOpen, UsersRound, MessageSquare, Quote, Inbox, Building2, Menu, X,
} from "lucide-react";

export const Route = createFileRoute("/admin/_layout")({
  beforeLoad: async ({ location }) => {
    const session = await getAdminSession();
    if (!session) {
      throw redirect({ to: "/admin/login", search: { redirect: location.href } });
    }
    return { session };
  },
  component: AdminLayout,
});

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/applications", label: "Applications", icon: FileText },
  { to: "/admin/students", label: "Students", icon: GraduationCap },
  { to: "/admin/departments", label: "Departments", icon: Building2 },
  { to: "/admin/faculty", label: "Faculty", icon: Users },
  { to: "/admin/principal", label: "Principal", icon: UserCircle },
  { to: "/admin/images", label: "Site Images", icon: ImageIcon },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/alumni", label: "Alumni", icon: UsersRound },
  { to: "/admin/users", label: "Admin Users", icon: Users },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/events", label: "Events", icon: Calendar },
  { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { to: "/admin/feedback", label: "Feedback", icon: MessageSquare },
  { to: "/admin/dynamic-sections", label: "IQAC / NIRF / AQAR", icon: FileText },
  { to: "/admin/content", label: "Site Content", icon: Settings },
];

function AdminLayout() {
  const { session } = Route.useRouteContext();
  const router = useRouter();
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  // Below `lg` the sidebar is a drawer — a fixed 256px rail left only ~120px of
  // usable width on a phone.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the drawer whenever the section changes.
  useEffect(() => setSidebarOpen(false), [pathname]);

  async function handleLogout() {
    await adminLogout();
    router.navigate({ to: "/", replace: true });
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Backdrop behind the drawer on small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — drawer under lg, fixed rail from lg up */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 bg-primary-deep text-primary-foreground flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-gold/20 grid place-items-center">
              <GraduationCap className="size-5 text-gold" />
            </div>
            <div>
              <div className="font-extrabold text-sm">GTM Admin</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Control Panel</div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 lg:hidden"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all [&.active]:bg-gold/20 [&.active]:text-gold"
              activeProps={{ className: "active" }}
            >
              <Icon className="size-4" />
              {label}
              <ChevronRight className="size-3 ml-auto opacity-40" />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="px-3 py-2 text-xs text-white/40 truncate">{session?.email}</div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="size-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar — only under lg, where the sidebar is a drawer */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-primary-deep text-primary-foreground">
          <button
            onClick={() => setSidebarOpen(true)}
            className="size-9 grid place-items-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="font-extrabold text-sm">GTM Admin</div>
          <Link to="/" className="ml-auto text-[11px] font-semibold text-white/70 hover:text-white">
            View site
          </Link>
        </div>

        <main className="flex-1 min-w-0 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
