import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { listUsers, createUser, deleteUser, updateUserPassword } from "@/lib/admin-fns";
import { Plus, Trash2, KeyRound, Shield, User } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/users")({
  loader: () => listUsers(),
  component: UsersPage,
});

function UsersPage() {
  const users = Route.useLoaderData();
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);
  const [pwModal, setPwModal] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", name: "", password: "", role: "EDITOR" as "EDITOR" | "SUPER_ADMIN" });
  const [newPw, setNewPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createUser({ data: form });
      setShowCreate(false);
      setForm({ email: "", name: "", password: "", role: "EDITOR" });
      router.invalidate();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this user?")) return;
    await deleteUser({ data: { id } });
    router.invalidate();
  }

  async function handlePwChange(e: React.FormEvent) {
    e.preventDefault();
    if (!pwModal) return;
    await updateUserPassword({ data: { id: pwModal, password: newPw } });
    setPwModal(null);
    setNewPw("");
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Admin Users</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage who can access the admin panel</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90"
        >
          <Plus className="size-4" /> New User
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              {["Name", "Email", "Role", "Created", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u: { id: string; name: string; email: string; role: string; createdAt: string }) => (
              <tr key={u.id} className="hover:bg-secondary/50 transition-colors">
                <td className="px-5 py-4 font-medium text-foreground flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/10 grid place-items-center text-primary font-bold text-xs">
                    {u.name[0]}
                  </div>
                  {u.name}
                </td>
                <td className="px-5 py-4 text-muted-foreground">{u.email}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${u.role === "SUPER_ADMIN" ? "bg-gold/15 text-gold-deep" : "bg-secondary text-muted-foreground"}`}>
                    {u.role === "SUPER_ADMIN" ? <Shield className="size-3" /> : <User className="size-3" />}
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted-foreground text-xs">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setPwModal(u.id); setNewPw(""); }} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                      <KeyRound className="size-4" />
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-elegant">
            <h2 className="font-extrabold text-lg text-foreground mb-5">Create New User</h2>
            {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
            <form onSubmit={handleCreate} className="space-y-4">
              {(["name", "email", "password"] as const).map((field) => (
                <div key={field}>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5 capitalize">{field}</label>
                  <input
                    type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as "EDITOR" | "SUPER_ADMIN" })} className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold">
                  <option value="EDITOR">Editor</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-3 rounded-xl border border-border text-sm font-bold hover:bg-secondary">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60">
                  {loading ? "Creating…" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {pwModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-elegant">
            <h2 className="font-extrabold text-lg text-foreground mb-5">Change Password</h2>
            <form onSubmit={handlePwChange} className="space-y-4">
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                required
                minLength={6}
                placeholder="New password (min 6 chars)"
                className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setPwModal(null)} className="flex-1 py-3 rounded-xl border border-border text-sm font-bold hover:bg-secondary">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
