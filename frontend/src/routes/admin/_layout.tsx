import { createFileRoute, Outlet, redirect, Link, useRouter } from "@tanstack/react-router";
import { getAdminSession, adminLogout } from "@/lib/admin-fns";
import {
  LayoutDashboard, Users, Newspaper, Calendar, Megaphone,
  Settings, LogOut, GraduationCap, ChevronRight, FileText, UserCircle, ImageIcon, BookOpen, UsersRound, MessageSquare, Quote, Inbox,
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

  async function handleLogout() {
    await adminLogout();
    router.navigate({ to: "/", replace: true });
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-primary-deep text-primary-foreground flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-gold/20 grid place-items-center">
              <GraduationCap className="size-5 text-gold" />
            </div>
            <div>
              <div className="font-extrabold text-sm">GTM Admin</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Control Panel</div>
            </div>
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
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
