import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getApplications, getApplicationStats, updateApplicationStatus } from "@/lib/student-fns";
import type { Application, AppStats } from "@/lib/student-fns";
import { Search, CheckCircle2, XCircle, Clock, AlertCircle, Eye, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/applications")({
  loader: async () => {
    const [apps, stats] = await Promise.all([getApplications(), getApplicationStats()]);
    return { apps, stats };
  },
  component: ApplicationsPage,
});

const STATUS_COLORS: Record<string, string> = {
  PENDING:      "bg-yellow-100 text-yellow-800",
  UNDER_REVIEW: "bg-blue-100 text-blue-800",
  ACCEPTED:     "bg-green-100 text-green-800",
  REJECTED:     "bg-red-100 text-red-800",
  WAITLISTED:   "bg-purple-100 text-purple-800",
};
const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending", UNDER_REVIEW: "Under Review", ACCEPTED: "Accepted", REJECTED: "Rejected", WAITLISTED: "Waitlisted",
};

function ApplicationsPage() {
  const { apps: initial, stats } = Route.useLoaderData();
  const router = useRouter();
  const [apps, setApps] = useState<Application[]>(initial);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selected, setSelected] = useState<Application | null>(null);
  const [note, setNote] = useState("");
  const [updating, setUpdating] = useState(false);

  async function loadApps(status: string, q: string) {
    const data = await getApplications({ status: status !== "ALL" ? status : undefined, search: q || undefined });
    setApps(data);
  }

  async function handleStatusChange(id: string, status: string) {
    setUpdating(true);
    try {
      await updateApplicationStatus({ id, status, adminNote: note });
      setSelected(null); setNote("");
      router.invalidate();
      await loadApps(filterStatus, search);
    } finally { setUpdating(false); }
  }

  const statCards = [
    { label: "Total", value: stats.total, color: "text-foreground", bg: "bg-secondary" },
    { label: "Pending", value: stats.pending, color: "text-yellow-700", bg: "bg-yellow-50" },
    { label: "Under Review", value: stats.underReview, color: "text-blue-700", bg: "bg-blue-50" },
    { label: "Accepted", value: stats.accepted, color: "text-green-700", bg: "bg-green-50" },
    { label: "Rejected", value: stats.rejected, color: "text-red-700", bg: "bg-red-50" },
    { label: "Waitlisted", value: stats.waitlisted, color: "text-purple-700", bg: "bg-purple-50" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground">Applications</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and manage student admission applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {statCards.map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
            <div className={`text-2xl font-extrabold ${color}`}>{value}</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); loadApps(filterStatus, e.target.value); }}
            placeholder="Search by name, email, programme…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); loadApps(e.target.value, search); }}
          className="px-4 py-2.5 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="ALL">All Status</option>
          {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Narrow screens scroll the table instead of clipping it. */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                {["Applicant", "Programme", "Exam / Score", "Board %", "Applied", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {apps.map((app) => (
                <tr key={app.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-foreground">{app.student?.name}</div>
                    <div className="text-xs text-muted-foreground">{app.student?.email}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium">{app.programme}</div>
                    <div className="text-xs text-muted-foreground">{app.branch}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium">{app.entranceExam}</div>
                    <div className="text-xs text-muted-foreground">{app.entranceScore}</div>
                  </td>
                  <td className="px-4 py-4 font-medium">{app.boardPercent}%</td>
                  <td className="px-4 py-4 text-xs text-muted-foreground">{new Date(app.submittedAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${STATUS_COLORS[app.status]}`}>
                      {STATUS_LABELS[app.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => { setSelected(app); setNote(app.adminNote ?? ""); }}
                      className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                      <Eye className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {apps.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">No applications found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-2xl shadow-elegant max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-extrabold text-xl text-foreground">{selected.student?.name}</h2>
                <p className="text-sm text-muted-foreground">{selected.student?.email} · {selected.student?.phone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[selected.status]}`}>{STATUS_LABELS[selected.status]}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
              {[
                ["Programme", `${selected.programme} — ${selected.branch}`],
                ["Entrance Exam", `${selected.entranceExam} | ${selected.entranceScore}`],
                ["Board %", `${selected.boardPercent}%`],
                ["Application ID", selected.id.slice(0, 8).toUpperCase()],
                ["Address", `${selected.address}, ${selected.city}, ${selected.state} ${selected.pincode}`],
                ["Guardian", `${selected.guardianName} (${selected.guardianPhone})`],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{l}</div>
                  <div className="font-medium text-foreground">{v}</div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Note to Student (optional)</label>
              <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)}
                placeholder="Add a message for the student…"
                className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>

            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleStatusChange(selected.id, "UNDER_REVIEW")} disabled={updating}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:opacity-90 disabled:opacity-60">
                <AlertCircle className="size-4" /> Mark Under Review
              </button>
              <button onClick={() => handleStatusChange(selected.id, "ACCEPTED")} disabled={updating}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:opacity-90 disabled:opacity-60">
                <CheckCircle2 className="size-4" /> Accept
              </button>
              <button onClick={() => handleStatusChange(selected.id, "WAITLISTED")} disabled={updating}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold hover:opacity-90 disabled:opacity-60">
                <Clock className="size-4" /> Waitlist
              </button>
              <button onClick={() => handleStatusChange(selected.id, "REJECTED")} disabled={updating}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:opacity-90 disabled:opacity-60">
                <XCircle className="size-4" /> Reject
              </button>
              <button onClick={() => setSelected(null)} className="ml-auto px-4 py-2.5 rounded-xl border border-border text-sm font-bold hover:bg-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
