import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { studentLogin, getStudentSession } from "@/lib/student-fns";

export const Route = createFileRoute("/student/login")({
  beforeLoad: async () => {
    const s = await getStudentSession();
    if (s) { window.location.href = "/student/dashboard"; }
  },
  component: StudentLoginPage,
});

function StudentLoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "", name: "", phone: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if (tab === "login") {
        await studentLogin({ email: form.email, password: form.password });
      } else {
        const { studentRegister } = await import("@/lib/student-fns");
        await studentRegister({ email: form.email, password: form.password, name: form.name, phone: form.phone });
      }
      router.navigate({ to: "/student/dashboard" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-deep via-primary to-primary/80 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex size-16 rounded-2xl bg-gold/20 items-center justify-center mb-4">
            <GraduationCap className="size-8 text-gold" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Student Portal</h1>
          <p className="text-white/50 text-sm mt-1">GTM COLLEGE OF ARTS & SCIENCE — Admissions 2025–26</p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-elegant">
          <div className="flex rounded-xl bg-secondary p-1 mb-6">
            {(["login", "register"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                {t === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                    placeholder="Your full name" className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required
                    placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
              </>
            )}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                  placeholder="you@email.com" className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required
                  placeholder="••••••••" className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-deep text-primary-foreground font-bold hover:opacity-90 disabled:opacity-60 transition-all">
              {loading ? "Please wait…" : tab === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            <Link to="/" className="hover:text-primary">← Back to GTM COLLEGE OF ARTS & SCIENCE</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
