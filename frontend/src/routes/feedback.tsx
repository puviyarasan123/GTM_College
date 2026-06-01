import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Users, UserCheck, BookOpen } from "lucide-react";
import type { FeedbackField } from "@/lib/admin-fns";

type FeedbackCategory = "STUDENT" | "PARENT" | "ALUMNI" | "TEACHER_PUBLIC";

export const Route = createFileRoute("/feedback")({
  validateSearch: (s: Record<string, unknown>) => ({
    tab: (s.tab as FeedbackCategory) ?? "STUDENT",
  }),
  component: FeedbackPage,
});

// ── Default fields per category (used when admin hasn't configured yet) ────────
const DEFAULT_FIELDS: Record<FeedbackCategory, FeedbackField[]> = {
  STUDENT: [
    { id: "name",        label: "Full Name",                    type: "text",     required: true },
    { id: "rollno",      label: "Roll Number",                  type: "text",     required: true },
    { id: "dept",        label: "Department",                   type: "select",   required: true,
      options: ["Tamil","English","Mathematics","Physics","Chemistry","Computer Science","Information Technology","Commerce","BBA","BCA","Zoology","Botany"] },
    { id: "year",        label: "Year of Study",                type: "radio",    required: true,
      options: ["I Year","II Year","III Year"] },
    { id: "teaching",    label: "Quality of Teaching",          type: "rating",   required: true },
    { id: "facilities",  label: "Campus Facilities",            type: "rating",   required: true },
    { id: "library",     label: "Library Resources",            type: "rating",   required: true },
    { id: "placement",   label: "Placement Support",            type: "rating",   required: true },
    { id: "overall",     label: "Overall Satisfaction",         type: "rating",   required: true },
    { id: "suggestions", label: "Suggestions for Improvement",  type: "textarea", required: false },
  ],
  PARENT: [
    { id: "name",        label: "Parent / Guardian Name",       type: "text",     required: true },
    { id: "phone",       label: "Mobile Number",                type: "text",     required: true },
    { id: "student",     label: "Student Name",                 type: "text",     required: true },
    { id: "dept",        label: "Student's Department",         type: "select",   required: true,
      options: ["Tamil","English","Mathematics","Physics","Chemistry","Computer Science","Information Technology","Commerce","BBA","BCA","Zoology","Botany"] },
    { id: "communication", label: "College Communication",      type: "rating",   required: true },
    { id: "safety",      label: "Campus Safety & Environment",  type: "rating",   required: true },
    { id: "teaching",    label: "Quality of Education",         type: "rating",   required: true },
    { id: "satisfied",   label: "Are you satisfied with the college?", type: "radio", required: true,
      options: ["Very Satisfied","Satisfied","Neutral","Dissatisfied"] },
    { id: "suggestions", label: "Any Suggestions",              type: "textarea", required: false },
  ],
  ALUMNI: [
    { id: "name",        label: "Full Name",                    type: "text",     required: true },
    { id: "email",       label: "Email Address",                type: "text",     required: true },
    { id: "batch",       label: "Batch Year",                   type: "text",     required: true, },
    { id: "dept",        label: "Department",                   type: "select",   required: true,
      options: ["Tamil","English","Mathematics","Physics","Chemistry","Computer Science","Information Technology","Commerce","BBA","BCA","Zoology","Botany"] },
    { id: "employed",    label: "Current Employment Status",    type: "radio",    required: true,
      options: ["Employed","Self-Employed","Higher Studies","Seeking Employment"] },
    { id: "company",     label: "Current Organisation / Institution", type: "text", required: false },
    { id: "curriculum",  label: "Curriculum Relevance to Career", type: "rating", required: true },
    { id: "skills",      label: "Skills Developed at GTMC",     type: "rating",   required: true },
    { id: "recommend",   label: "Would you recommend GTMC?",    type: "radio",    required: true,
      options: ["Definitely Yes","Yes","Maybe","No"] },
    { id: "message",     label: "Message to Current Students",  type: "textarea", required: false },
  ],
  TEACHER_PUBLIC: [
    { id: "name",        label: "Full Name",                    type: "text",     required: true },
    { id: "designation", label: "Designation / Role",           type: "text",     required: true },
    { id: "organisation",label: "Organisation / Institution",   type: "text",     required: false },
    { id: "relation",    label: "Relation to College",          type: "radio",    required: true,
      options: ["Teacher / Faculty","Industry Professional","Researcher","General Public","Other"] },
    { id: "academics",   label: "Academic Standards",           type: "rating",   required: true },
    { id: "infrastructure", label: "Infrastructure & Facilities", type: "rating", required: true },
    { id: "community",   label: "Community Engagement",         type: "rating",   required: true },
    { id: "overall",     label: "Overall Impression",           type: "rating",   required: true },
    { id: "suggestions", label: "Suggestions / Comments",       type: "textarea", required: false },
  ],
};

const CATEGORIES: { value: FeedbackCategory; label: string; description: string; icon: React.ElementType; color: string }[] = [
  { value: "STUDENT",        label: "Student Feedback",           description: "Currently enrolled students", icon: GraduationCap, color: "bg-blue-500/10 text-blue-600 border-blue-200" },
  { value: "PARENT",         label: "Parents Feedback",           description: "Parents & guardians",         icon: Users,         color: "bg-green-500/10 text-green-600 border-green-200" },
  { value: "ALUMNI",         label: "Alumni Feedback",            description: "Former students of GTMC",     icon: UserCheck,     color: "bg-purple-500/10 text-purple-600 border-purple-200" },
  { value: "TEACHER_PUBLIC", label: "Teachers / Public Feedback", description: "Faculty, professionals & public", icon: BookOpen,  color: "bg-orange-500/10 text-orange-600 border-orange-200" },
];

async function fetchForms() {
  const res = await fetch("/api/feedback/forms");
  if (!res.ok) return [];
  return res.json() as Promise<{ id: string; category: FeedbackCategory; fields: FeedbackField[] }[]>;
}

async function submitFeedback(payload: { category: FeedbackCategory; data: Record<string, string> }) {
  const res = await fetch("/api/feedback/submit", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message);
  }
  return res.json();
}

function RatingInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(String(n))}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 font-bold text-sm transition-all ${
            value === String(n)
              ? "bg-primary text-primary-foreground border-primary scale-105"
              : "border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          <span>{n}</span>
          <span className="text-[9px] font-normal opacity-70">{labels[n]}</span>
        </button>
      ))}
    </div>
  );
}

function FeedbackFormView({ category, fields }: { category: FeedbackCategory; fields: FeedbackField[] }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: () => submitFeedback({ category, data: values }),
    onSuccess: () => setSubmitted(true),
  });

  const set = (id: string, val: string) => setValues((p) => ({ ...p, [id]: val }));

  if (submitted) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-5xl">🎉</div>
        <h3 className="text-2xl font-bold text-green-600">Thank you for your feedback!</h3>
        <p className="text-muted-foreground">Your response has been recorded and will help us improve.</p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setValues({}); }}>
          Submit Another Response
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }} className="space-y-6">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id} className="text-sm font-semibold">
            {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>

          {field.type === "text" && (
            <Input id={field.id} value={values[field.id] ?? ""} onChange={(e) => set(field.id, e.target.value)} required={field.required} />
          )}
          {field.type === "textarea" && (
            <Textarea id={field.id} value={values[field.id] ?? ""} onChange={(e) => set(field.id, e.target.value)} required={field.required} rows={4} />
          )}
          {field.type === "select" && (
            <Select value={values[field.id] ?? ""} onValueChange={(v) => set(field.id, v)}>
              <SelectTrigger id={field.id}><SelectValue placeholder="Select an option" /></SelectTrigger>
              <SelectContent>
                {(field.options ?? []).map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          {field.type === "radio" && (
            <RadioGroup value={values[field.id] ?? ""} onValueChange={(v) => set(field.id, v)} className="flex flex-wrap gap-3">
              {(field.options ?? []).map((opt) => (
                <div key={opt} className="flex items-center gap-2">
                  <RadioGroupItem value={opt} id={`${field.id}-${opt}`} />
                  <Label htmlFor={`${field.id}-${opt}`} className="font-normal cursor-pointer">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {field.type === "rating" && (
            <RatingInput id={field.id} value={values[field.id] ?? ""} onChange={(v) => set(field.id, v)} />
          )}
        </div>
      ))}

      {mutation.isError && <p className="text-sm text-red-500">{(mutation.error as Error).message}</p>}

      <Button type="submit" disabled={mutation.isPending} className="w-full" size="lg">
        {mutation.isPending ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
}

function FeedbackPage() {
  const { tab } = Route.useSearch();
  const navigate = useNavigate({ from: "/feedback" });
  const { data: forms = [] } = useQuery({ queryKey: ["feedback-forms"], queryFn: fetchForms });

  const active = CATEGORIES.find((c) => c.value === tab) ?? CATEGORIES[0];

  function setTab(value: FeedbackCategory) {
    navigate({ search: { tab: value }, replace: true });
  }

  const adminForm = forms.find((f) => f.category === active.value);
  const fields = adminForm?.fields?.length ? adminForm.fields : DEFAULT_FIELDS[active.value];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary-deep text-white py-14 px-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold mb-3">GTMC Feedback Portal</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Share Your Feedback</h1>
        <p className="text-white/70 max-w-xl mx-auto text-sm">Your feedback helps us improve the quality of education and campus experience at Govt. Thirumagal Mills College.</p>
      </div>

      {/* Category selector */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const isActive = tab === c.value;
            return (
              <button
                key={c.value}
                onClick={() => setTab(c.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center shadow-sm ${
                  isActive
                    ? "bg-white border-primary shadow-md scale-[1.02]"
                    : "bg-white border-border hover:border-primary/40 hover:shadow-md"
                }`}
              >
                <div className={`size-10 rounded-xl grid place-items-center border ${c.color}`}>
                  <Icon className="size-5" />
                </div>
                <span className={`text-xs font-bold leading-tight ${isActive ? "text-primary" : "text-foreground"}`}>{c.label}</span>
                <span className="text-[10px] text-muted-foreground hidden sm:block">{c.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Card className="shadow-elegant">
          <CardHeader className="pb-4">
            <div className={`size-12 rounded-xl grid place-items-center border mb-3 ${active.color}`}>
              <active.icon className="size-6" />
            </div>
            <CardTitle className="text-xl">{active.label}</CardTitle>
            <CardDescription>{active.description} — please fill all required fields marked with *</CardDescription>
          </CardHeader>
          <CardContent>
            <FeedbackFormView key={active.value} category={active.value} fields={fields} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
