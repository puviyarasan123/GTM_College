import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { getStudentSession, getMyApplications, studentLogout } from "@/lib/student-fns";
import type { Application } from "@/lib/student-fns";
import { GraduationCap, FileText, CheckCircle2, XCircle, Clock, AlertCircle, LogOut, Plus } from "lucide-react";

export const Route = createFileRoute("/student/dashboard")({
  beforeLoad: async () => {
    const s = await getStudentSession();
    if (!s) { window.location.href = "/student/login"; return; }
    return { student: s };
  },
  loader: () => getMyApplications(),
  component: StudentDashboard,
});

const STATUS_CONFIG = {
  PENDING:      { label: "Pending Review",  color: "bg-yellow-100 text-yellow-800", icon: Clock },
  UNDER_REVIEW: { label: "Under Review",    color: "bg-blue-100 text-blue-800",     icon: AlertCircle },
  ACCEPTED:     { label: "Accepted! 🎉",    color: "bg-green-100 text-green-800",   icon: CheckCircle2 },
  REJECTED:     { label: "Not Selected",    color: "bg-red-100 text-red-800",       icon: XCircle },
  WAITLISTED:   { label: "Waitlisted",      color: "bg-purple-100 text-purple-800", icon: Clock },
};

function StatusBadge({ status }: { status: Application["status"] }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cfg.color}`}>
      <Icon className="size-3.5" /> {cfg.label}
    </span>
  );
}

function StudentDashboard() {
  const router = useRouter();
  const applications = Route.useLoaderData() as Application[];
  const ctx = Route.useRouteContext();
  const student = (ctx as { student?: { name: string; email: string } }).student;

  async function handleLogout() {
    await studentLogout();
    router.navigate({ to: "/student/login" });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary-deep text-white px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="size-6 text-gold" />
          <div>
            <div className="font-extrabold text-sm">GTM COLLEGE OF ARTS & SCIENCE</div>
            <div className="text-[10px] text-white/50">Student Portal</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold">{student?.name}</div>
            <div className="text-xs text-white/50">{student?.email}</div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm transition-colors">
            <LogOut className="size-4" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">My Applications</h1>
            <p className="text-muted-foreground text-sm mt-1">Track your admission application status</p>
          </div>
          {applications.length === 0 && (
            <Link to="/apply" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
              <Plus className="size-4" /> Apply Now
            </Link>
          )}
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <FileText className="size-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-bold text-foreground mb-2">No applications yet</h2>
            <p className="text-muted-foreground text-sm mb-6">Start your admission journey by submitting an application.</p>
            <Link to="/apply" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90">
              <Plus className="size-4" /> Apply for Admission
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-extrabold text-foreground text-lg">{app.programme} — {app.branch}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Applied {new Date(app.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div><div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Entrance Exam</div><div className="font-medium">{app.entranceExam}</div></div>
                  <div><div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Score</div><div className="font-medium">{app.entranceScore}</div></div>
                  <div><div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Board %</div><div className="font-medium">{app.boardPercent}%</div></div>
                  <div><div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Application ID</div><div className="font-mono text-xs">{app.id.slice(0, 8).toUpperCase()}</div></div>
                </div>

                {app.adminNote && (
                  <div className={`mt-4 p-4 rounded-xl text-sm ${app.status === "ACCEPTED" ? "bg-green-50 border border-green-200 text-green-800" : app.status === "REJECTED" ? "bg-red-50 border border-red-200 text-red-800" : "bg-blue-50 border border-blue-200 text-blue-800"}`}>
                    <div className="font-bold mb-1">Message from Admissions Office:</div>
                    {app.adminNote}
                  </div>
                )}

                {/* Progress Steps */}
                <div className="mt-5 flex items-center gap-2">
                  {(["PENDING", "UNDER_REVIEW", "ACCEPTED"] as const).map((s, i) => {
                    const steps = ["PENDING", "UNDER_REVIEW", "ACCEPTED", "REJECTED", "WAITLISTED"];
                    const currentIdx = steps.indexOf(app.status);
                    const stepIdx = steps.indexOf(s);
                    const done = app.status === "ACCEPTED" ? stepIdx <= 2 : currentIdx >= stepIdx;
                    return (
                      <div key={s} className="flex items-center gap-2 flex-1">
                        <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{i + 1}</div>
                        <div className={`text-xs font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>{["Submitted", "In Review", "Decision"][i]}</div>
                        {i < 2 && <div className={`flex-1 h-0.5 ${done && currentIdx > stepIdx ? "bg-primary" : "bg-border"}`} />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
