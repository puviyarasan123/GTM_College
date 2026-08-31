import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getCourses, saveCourses } from "@/lib/content-fns";
import type { CoursesData, UgCourse, PgCourse, ResearchDept, ResearchProgram } from "@/lib/content-fns";
import { Save, Plus, Trash2, Loader2, ChevronDown, ChevronUp } from "lucide-react";

// ── Static defaults ────────────────────────────────────────────────────────────
const DEFAULT_UG: UgCourse[] = [
  { sno: 1, department: "Mathematics", course: "B.Sc. Mathematics", medium: "TM / EM", shift: "Shift-I & Shift-II", established: "1964-1965", stream: "Science" },
  { sno: 2, department: "Economics", course: "B.A. Economics", medium: "EM Only", shift: "Shift-I", established: "1964-1965", stream: "Arts" },
  { sno: 3, department: "Botany", course: "B.Sc. Botany", medium: "TM / EM", shift: "Shift-I & Shift-II", established: "1969-1970", stream: "Science" },
  { sno: 4, department: "Physics", course: "B.Sc. Physics", medium: "TM / EM", shift: "Shift-I", established: "1969-1970", stream: "Science" },
  { sno: 5, department: "Chemistry", course: "B.Sc. Chemistry", medium: "TM / EM", shift: "Shift-I & Shift-II", established: "1980-1981", stream: "Science" },
  { sno: 6, department: "Commerce", course: "B.Com. Commerce", medium: "EM Only", shift: "Shift-I", established: "2005-2006", stream: "Commerce" },
  { sno: 7, department: "Tamil", course: "B.A. Tamil", medium: "TM Only", shift: "Shift-I", established: "2012-2013", stream: "Arts" },
  { sno: 8, department: "English", course: "B.A. English", medium: "EM Only", shift: "Shift-I", established: "2012-2013", stream: "Arts" },
  { sno: 9, department: "Computer Science", course: "B.Sc. Computer Science", medium: "EM Only", shift: "Shift-I", established: "2012-2013", stream: "Science" },
  { sno: 10, department: "Computer Science & Apps", course: "B.C.A. (Computer Applications)", medium: "EM Only", shift: "Shift-I", established: "2013-2014", stream: "Science" },
  { sno: 11, department: "History", course: "B.A. History", medium: "EM Only", shift: "Shift-I", established: "2013-2014", stream: "Arts" },
  { sno: 12, department: "Zoology", course: "B.Sc. Zoology", medium: "EM Only", shift: "Shift-I", established: "2013-2014", stream: "Science" },
  { sno: 13, department: "Business Administration", course: "B.B.A. Business Administration", medium: "EM Only", shift: "Shift-I", established: "2013-2014", stream: "Management" },
];

const DEFAULT_PG: PgCourse[] = [
  { sno: 1, department: "Mathematics", course: "M.Sc. Mathematics", medium: "EM Only", shift: "Shift-I", established: "1982-1983", stream: "Science" },
  { sno: 2, department: "Computer Applications", course: "M.C.A. (Master of Computer Applications)", medium: "EM Only", shift: "Shift-I", established: "2004-2005", stream: "Science" },
  { sno: 3, department: "Economics", course: "M.A. Economics", medium: "EM Only", shift: "Shift-I", established: "2012-2013", stream: "Arts" },
  { sno: 4, department: "Botany", course: "M.Sc. Botany", medium: "TM / EM", shift: "Shift-I & Shift-II", established: "2012-2013", stream: "Science" },
  { sno: 5, department: "Physics", course: "M.Sc. Physics", medium: "TM / EM", shift: "Shift-I", established: "2012-2013", stream: "Science" },
  { sno: 6, department: "Chemistry", course: "M.Sc. Chemistry", medium: "TM / EM", shift: "Shift-I & Shift-II", established: "2012-2013", stream: "Science" },
  { sno: 7, department: "Commerce", course: "M.Com. Commerce", medium: "EM Only", shift: "Shift-I", established: "2012-2013", stream: "Commerce" },
  { sno: 8, department: "Tamil", course: "M.A. Tamil", medium: "TM Only", shift: "Shift-I", established: "2012-2013", stream: "Arts" },
  { sno: 9, department: "English", course: "M.A. English", medium: "EM Only", shift: "Shift-I", established: "2012-2013", stream: "Arts" },
  { sno: 10, department: "History", course: "M.A. History", medium: "EM Only", shift: "Shift-I", established: "2018-2019", stream: "Arts" },
  { sno: 11, department: "Computer Science", course: "M.Sc. Computer Science", medium: "EM Only", shift: "Shift-I", established: "2013-2014", stream: "Science" },
];

const DEFAULT_RESEARCH: ResearchDept[] = [
  { department: "Computer Science", category: "Science", programs: [{ degree: "M.Phil. Computer Science", type: "Full Time & Part Time", established: "2012-2013" }, { degree: "Ph.D. Computer Science", type: "Full Time & Part Time", established: "2012-2013" }] },
  { department: "Mathematics", category: "Science", programs: [{ degree: "M.Phil. Mathematics", type: "Full Time & Part Time", established: "2012-2013" }, { degree: "Ph.D. Mathematics", type: "Full Time & Part Time", established: "2012-2013" }] },
  { department: "Chemistry", category: "Science", programs: [{ degree: "M.Phil. Chemistry", type: "Full Time & Part Time", established: "2018-2019" }, { degree: "Ph.D. Chemistry", type: "Full Time & Part Time", established: "2018-2019" }] },
  { department: "Physics", category: "Science", programs: [{ degree: "M.Phil. Physics", type: "Full Time & Part Time", established: "2018-2019" }, { degree: "Ph.D. Physics", type: "Full Time & Part Time", established: "2018-2019" }] },
  { department: "Botany", category: "Science", programs: [{ degree: "M.Phil. Botany", type: "Full Time & Part Time", established: "2018-2019" }, { degree: "Ph.D. Botany", type: "Full Time & Part Time", established: "2018-2019" }] },
  { department: "English", category: "Arts", programs: [{ degree: "M.Phil. English", type: "Full Time & Part Time", established: "2018-2019" }, { degree: "Ph.D. English", type: "Full Time & Part Time", established: "2018-2019" }] },
  { department: "Tamil", category: "Arts", programs: [{ degree: "M.Phil. Tamil", type: "Full Time & Part Time", established: "2018-2019" }, { degree: "Ph.D. Tamil", type: "Full Time & Part Time", established: "2018-2019" }] },
  { department: "Economics", category: "Arts", programs: [{ degree: "M.Phil. Economics", type: "Full Time & Part Time", established: "2018-2019" }, { degree: "Ph.D. Economics", type: "Full Time & Part Time", established: "2018-2019" }] },
  { department: "Commerce", category: "Commerce", programs: [{ degree: "M.Phil. Commerce", type: "Full Time & Part Time", established: "2018-2019" }, { degree: "Ph.D. Commerce", type: "Full Time & Part Time", established: "2018-2019" }] },
];

export const Route = createFileRoute("/admin/_layout/courses")({
  loader: async (): Promise<CoursesData> => {
    try {
      const data = await getCourses();
      if (data.ug?.length || data.pg?.length || data.research?.length) return data;
    } catch {}
    return { ug: DEFAULT_UG, pg: DEFAULT_PG, research: DEFAULT_RESEARCH };
  },
  component: AdminCoursesPage,
});

const INPUT = "w-full px-3 py-2 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-primary";

// ── UG / PG row editor ─────────────────────────────────────────────────────────
function CourseRow<T extends UgCourse | PgCourse>({
  row, onChange, onRemove,
}: { row: T; onChange: (r: T) => void; onRemove: () => void }) {
  const fields: (keyof T)[] = ["department", "course", "medium", "shift", "established", "stream"] as (keyof T)[];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 items-end p-3 rounded-xl bg-secondary/40 border border-border">
      {fields.map((f) => (
        <div key={String(f)}>
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">{String(f)}</label>
          <input
            value={String(row[f] ?? "")}
            onChange={(e) => onChange({ ...row, [f]: e.target.value })}
            className={INPUT}
          />
        </div>
      ))}
      <button onClick={onRemove} className="flex items-center justify-center size-9 rounded-xl hover:bg-red-50 text-red-500 shrink-0 mt-4">
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

// ── Research dept editor ───────────────────────────────────────────────────────
function ResearchDeptRow({
  dept, onChange, onRemove,
}: { dept: ResearchDept; onChange: (d: ResearchDept) => void; onRemove: () => void }) {
  const [open, setOpen] = useState(false);

  function updateProgram(i: number, field: keyof ResearchProgram, value: string) {
    const programs = dept.programs.map((p, idx) => idx === i ? { ...p, [field]: value } : p);
    onChange({ ...dept, programs });
  }

  function addProgram() {
    onChange({ ...dept, programs: [...dept.programs, { degree: "", type: "Full Time & Part Time", established: "" }] });
  }

  function removeProgram(i: number) {
    onChange({ ...dept, programs: dept.programs.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="rounded-xl border border-border bg-secondary/30 overflow-hidden">
      <div className="flex items-center gap-3 p-3">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Department</label>
            <input value={dept.department} onChange={(e) => onChange({ ...dept, department: e.target.value })} className={INPUT} />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Category</label>
            <select value={dept.category} onChange={(e) => onChange({ ...dept, category: e.target.value })} className={INPUT}>
              {["Science", "Arts", "Commerce", "Management"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="size-8 grid place-items-center rounded-lg hover:bg-secondary text-muted-foreground">
          {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
        <button onClick={onRemove} className="size-8 grid place-items-center rounded-lg hover:bg-red-50 text-red-500">
          <Trash2 className="size-4" />
        </button>
      </div>

      {open && (
        <div className="px-3 pb-3 space-y-2 border-t border-border pt-3">
          {dept.programs.map((prog, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
              {(["degree", "type", "established"] as (keyof ResearchProgram)[]).map((f) => (
                <div key={f}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">{f}</label>
                  <input value={prog[f]} onChange={(e) => updateProgram(i, f, e.target.value)} className={INPUT} />
                </div>
              ))}
              <button onClick={() => removeProgram(i)} className="size-8 grid place-items-center rounded-lg hover:bg-red-50 text-red-500 mt-4">
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
          <button onClick={addProgram} className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mt-1">
            <Plus className="size-3.5" /> Add Programme
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
function AdminCoursesPage() {
  const loaded = Route.useLoaderData() as CoursesData;
  const router = useRouter();
  const [data, setData] = useState<CoursesData>(loaded);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"ug" | "pg" | "research">("ug");

  function addUg() {
    const sno = (data.ug.at(-1)?.sno ?? 0) + 1;
    setData((d) => ({ ...d, ug: [...d.ug, { sno, department: "", course: "", medium: "EM Only", shift: "Shift-I", established: "", stream: "Science" }] }));
    setSaved(false);
  }

  function addPg() {
    const sno = (data.pg.at(-1)?.sno ?? 0) + 1;
    setData((d) => ({ ...d, pg: [...d.pg, { sno, department: "", course: "", medium: "EM Only", shift: "Shift-I", established: "", stream: "Science" }] }));
    setSaved(false);
  }

  function addResearch() {
    setData((d) => ({ ...d, research: [...d.research, { department: "", category: "Science", programs: [] }] }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveCourses({ data });
      setSaved(true);
      router.invalidate();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Courses</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage UG, PG and Research programmes shown on the public site.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save All"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {(["ug", "pg", "research"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-colors -mb-px ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}
          >
            {t === "ug" ? `UG (${data.ug.length})` : t === "pg" ? `PG (${data.pg.length})` : `Research (${data.research.length})`}
          </button>
        ))}
      </div>

      {/* UG Tab */}
      {tab === "ug" && (
        <div className="space-y-3">
          {data.ug.map((row, i) => (
            <CourseRow
              key={i}
              row={row}
              onChange={(r) => { const ug = [...data.ug]; ug[i] = r; setData((d) => ({ ...d, ug })); setSaved(false); }}
              onRemove={() => { setData((d) => ({ ...d, ug: d.ug.filter((_, idx) => idx !== i) })); setSaved(false); }}
            />
          ))}
          <button onClick={addUg} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-sm font-bold hover:bg-secondary/80">
            <Plus className="size-4" /> Add UG Course
          </button>
        </div>
      )}

      {/* PG Tab */}
      {tab === "pg" && (
        <div className="space-y-3">
          {data.pg.map((row, i) => (
            <CourseRow
              key={i}
              row={row}
              onChange={(r) => { const pg = [...data.pg]; pg[i] = r; setData((d) => ({ ...d, pg })); setSaved(false); }}
              onRemove={() => { setData((d) => ({ ...d, pg: d.pg.filter((_, idx) => idx !== i) })); setSaved(false); }}
            />
          ))}
          <button onClick={addPg} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-sm font-bold hover:bg-secondary/80">
            <Plus className="size-4" /> Add PG Course
          </button>
        </div>
      )}

      {/* Research Tab */}
      {tab === "research" && (
        <div className="space-y-3">
          {data.research.map((dept, i) => (
            <ResearchDeptRow
              key={i}
              dept={dept}
              onChange={(d) => { const research = [...data.research]; research[i] = d; setData((prev) => ({ ...prev, research })); setSaved(false); }}
              onRemove={() => { setData((d) => ({ ...d, research: d.research.filter((_, idx) => idx !== i) })); setSaved(false); }}
            />
          ))}
          <button onClick={addResearch} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-sm font-bold hover:bg-secondary/80">
            <Plus className="size-4" /> Add Research Department
          </button>
        </div>
      )}
    </div>
  );
}
