import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getStudentSession, submitApplication } from "@/lib/student-fns";
import { GraduationCap, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/apply")({
  beforeLoad: async () => {
    const s = await getStudentSession();
    if (!s) { window.location.href = "/student/login"; }
  },
  component: ApplyPage,
});

const PROGRAMMES = ["B.Sc.", "M.Sc.", "B.A.", "M.A.", "B.Com.", "M.Com.", "BBA", "BCA"];
const BRANCHES: Record<string, string[]> = {
  "B.Sc.": ["Physics", "Chemistry", "Mathematics", "Computer Science", "Biotechnology", "Microbiology", "Biochemistry", "Statistics", "Electronics", "Zoology", "Botany"],
  "M.Sc.": ["Physics", "Chemistry", "Mathematics", "Computer Science", "Biotechnology", "Microbiology", "Biochemistry", "Statistics", "Data Science"],
  "B.A.": ["English Literature", "Tamil Literature", "History", "Economics", "Political Science", "Psychology", "Sociology", "Public Administration"],
  "M.A.": ["English Literature", "Tamil Literature", "History", "Economics", "Political Science", "Psychology", "Sociology"],
  "B.Com.": ["General", "Computer Applications", "Professional Accounting", "Banking & Insurance", "E-Commerce"],
  "M.Com.": ["General", "Computer Applications", "Finance", "International Business"],
  "BBA": ["General Management", "Finance", "Marketing", "Human Resources", "International Business"],
  "BCA": ["General", "Data Science", "Cloud Computing", "Cyber Security"],
};
const EXAMS = ["12th Board Exam", "State Entrance", "University Entrance", "CUET", "Other"];

const STEPS = ["Programme", "Academic", "Personal", "Review"];

type FormData = {
  programme: string; branch: string; entranceExam: string; entranceScore: string; boardPercent: string;
  address: string; city: string; state: string; pincode: string; guardianName: string; guardianPhone: string;
};

const EMPTY: FormData = { programme: "", branch: "", entranceExam: "", entranceScore: "", boardPercent: "", address: "", city: "", state: "", pincode: "", guardianName: "", guardianPhone: "" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
const inputCls = "w-full px-4 py-3 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary";

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit() {
    setLoading(true); setError("");
    try {
      await submitApplication(form);
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally { setLoading(false); }
  }

  if (done) return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <CheckCircle2 className="size-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-extrabold text-foreground mb-2">Application Submitted!</h1>
        <p className="text-muted-foreground mb-6">Your application has been received. You can track its status in your student dashboard.</p>
        <button onClick={() => router.navigate({ to: "/student/dashboard" })}
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90">
          Go to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary-deep text-white px-4 sm:px-6 py-4 flex items-center gap-3">
        <GraduationCap className="size-6 text-gold" />
        <div>
          <div className="font-extrabold text-sm">GTM COLLEGE OF ARTS & SCIENCE</div>
          <div className="text-[10px] text-white/50">Admission Application 2025–26</div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:p-6">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{i + 1}</div>
              <div className={`text-xs font-medium hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-extrabold text-foreground mb-6">Choose Programme</h2>
              <Field label="Programme">
                <select value={form.programme} onChange={(e) => { set("programme", e.target.value); set("branch", ""); }} required className={inputCls}>
                  <option value="">Select programme</option>
                  {PROGRAMMES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
              {form.programme && (
                <Field label="Branch / Specialisation">
                  <select value={form.branch} onChange={(e) => set("branch", e.target.value)} required className={inputCls}>
                    <option value="">Select branch</option>
                    {(BRANCHES[form.programme] ?? []).map((b) => <option key={b}>{b}</option>)}
                  </select>
                </Field>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-extrabold text-foreground mb-6">Academic Details</h2>
              <Field label="Entrance Exam">
                <select value={form.entranceExam} onChange={(e) => set("entranceExam", e.target.value)} required className={inputCls}>
                  <option value="">Select exam</option>
                  {EXAMS.map((e) => <option key={e}>{e}</option>)}
                </select>
              </Field>
              <Field label="Entrance Score / Rank">
                <input value={form.entranceScore} onChange={(e) => set("entranceScore", e.target.value)} required placeholder="e.g. 85.4% or Rank 120" className={inputCls} />
              </Field>
              <Field label="10+2 Board Percentage">
                <input value={form.boardPercent} onChange={(e) => set("boardPercent", e.target.value)} required placeholder="e.g. 92.5" type="number" min="0" max="100" step="0.1" className={inputCls} />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-extrabold text-foreground mb-6">Personal Details</h2>
              <Field label="Address">
                <textarea value={form.address} onChange={(e) => set("address", e.target.value)} required rows={2} placeholder="Street address" className={inputCls + " resize-none"} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="City"><input value={form.city} onChange={(e) => set("city", e.target.value)} required placeholder="Chennai" className={inputCls} /></Field>
                <Field label="State"><input value={form.state} onChange={(e) => set("state", e.target.value)} required placeholder="Tamil Nadu" className={inputCls} /></Field>
              </div>
              <Field label="Pincode"><input value={form.pincode} onChange={(e) => set("pincode", e.target.value)} required placeholder="600001" className={inputCls} /></Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Guardian Name"><input value={form.guardianName} onChange={(e) => set("guardianName", e.target.value)} required placeholder="Parent / Guardian" className={inputCls} /></Field>
                <Field label="Guardian Phone"><input value={form.guardianPhone} onChange={(e) => set("guardianPhone", e.target.value)} required placeholder="+91 XXXXX XXXXX" className={inputCls} /></Field>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-foreground mb-6">Review & Submit</h2>
              {[
                { label: "Programme", value: `${form.programme} — ${form.branch}` },
                { label: "Entrance Exam", value: `${form.entranceExam} | Score: ${form.entranceScore}` },
                { label: "Board %", value: `${form.boardPercent}%` },
                { label: "Address", value: `${form.address}, ${form.city}, ${form.state} — ${form.pincode}` },
                { label: "Guardian", value: `${form.guardianName} (${form.guardianPhone})` },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 py-3 border-b border-border last:border-0">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground w-32 shrink-0 pt-0.5">{label}</div>
                  <div className="text-sm font-medium text-foreground">{value}</div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-4">By submitting, you confirm all information is accurate. False information will result in disqualification.</p>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-bold hover:bg-secondary">
                <ChevronLeft className="size-4" /> Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(step + 1)}
                disabled={step === 0 && (!form.programme || !form.branch)}
                className="flex items-center gap-2 ml-auto px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-50">
                Next <ChevronRight className="size-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className="flex items-center gap-2 ml-auto px-6 py-3 rounded-xl bg-green-600 text-white text-sm font-bold hover:opacity-90 disabled:opacity-60">
                <CheckCircle2 className="size-4" /> {loading ? "Submitting…" : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
