import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { adminLogin, getAdminSession } from "@/lib/admin-fns";

export const Route = createFileRoute("/admin/login")({
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (session) throw redirect({ to: "/admin/dashboard" });
  },
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin({ data: { email, password } });
      await router.invalidate();
      router.navigate({ to: "/admin/dashboard", replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-primary-deep flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-deep via-primary to-primary-deep/80" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex size-16 rounded-2xl bg-gold/20 items-center justify-center mb-4">
            <GraduationCap className="size-8 text-gold" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">GTM Admin</h1>
          <p className="text-white/50 text-sm mt-1">Sign in to manage your college site</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-elegant space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="admin@gtmc.edu.in"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-hero text-primary-foreground font-bold hover:opacity-90 disabled:opacity-60 transition-all"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
