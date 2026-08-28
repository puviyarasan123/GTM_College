import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  getAllDepartments, saveDepartment, deleteDepartment, reorderDepartments,
} from "@/lib/content-fns";
import type { Department } from "@/lib/content-fns";
import type { DeptBlock, DeptStaff, DeptSupervisor } from "@/lib/department-content";
import { ICON_NAMES, getIcon } from "@/lib/icons";
import {
  Plus, Trash2, Pencil, Eye, EyeOff, ArrowLeft, ArrowUp, ArrowDown, Save, Loader2,
  GripVertical, Users, LayoutList, Info, GraduationCap,
} from "lucide-react";

export const Route = createFileRoute("/admin/_layout/departments")({
  loader: () => getAllDepartments(),
  component: AdminDepartmentsPage,
});

type Draft = Omit<Department, "id"> & { id?: string };

const EMPTY: Draft = {
  slug: "", name: "", code: "", icon: "GraduationCap", summary: "",
  eyebrow: "", heroTitle: "", heroSubtitle: "",
  blocks: [], staffHeading: "", staff: [], supervisorsHeading: "", supervisors: [],
  aliases: [], order: 0, active: true,
};

const slugify = (v: string) =>
  v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const field = "w-full px-3.5 py-2.5 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold";
const cellField = "w-full px-2.5 py-2 rounded-lg bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-gold";
const label = "text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1.5";

/** Moves an item within a list; returns a new array. */
function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

// ── Content block editor ─────────────────────────────────────────────────────

function BlockEditor({
  block, index, total, onChange, onRemove, onMove,
}: {
  block: DeptBlock;
  index: number;
  total: number;
  onChange: (b: DeptBlock) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const set = (patch: Partial<DeptBlock>) => onChange({ ...block, ...patch } as DeptBlock);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <GripVertical className="size-4 text-muted-foreground" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-deep">
          {block.kind} block
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button type="button" onClick={() => onMove(-1)} disabled={index === 0} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30" title="Move up">
            <ArrowUp className="size-3.5" />
          </button>
          <button type="button" onClick={() => onMove(1)} disabled={index === total - 1} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30" title="Move down">
            <ArrowDown className="size-3.5" />
          </button>
          <button type="button" onClick={onRemove} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500" title="Remove block">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-[1fr_170px_auto] gap-3 items-end">
        <div>
          <label className={label}>Heading</label>
          <input value={block.heading} onChange={(e) => set({ heading: e.target.value })} className={field} />
        </div>
        <div>
          <label className={label}>Icon</label>
          <select value={block.icon ?? ""} onChange={(e) => set({ icon: e.target.value })} className={field}>
            <option value="">Default</option>
            {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-2 pb-2.5 cursor-pointer whitespace-nowrap">
          <input type="checkbox" checked={!!block.half} onChange={(e) => set({ half: e.target.checked })} className="size-4 rounded" />
          <span className="text-xs font-semibold">Half width</span>
        </label>
      </div>

      {block.kind === "text" && (
        <>
          <div>
            <label className={label}>Quote (optional)</label>
            <input value={block.quote ?? ""} onChange={(e) => set({ quote: e.target.value })} className={field} />
          </div>
          <div>
            <label className={label}>Body — blank line starts a new paragraph, **bold** and *italic* supported</label>
            <textarea rows={8} value={block.body} onChange={(e) => set({ body: e.target.value })} className={`${field} resize-y`} />
          </div>
        </>
      )}

      {block.kind === "list" && (
        <>
          <div>
            <label className={label}>Intro (optional)</label>
            <textarea rows={2} value={block.intro ?? ""} onChange={(e) => set({ intro: e.target.value })} className={`${field} resize-y`} />
          </div>
          <div>
            <label className={label}>Bullet points — one per line</label>
            <textarea
              rows={6}
              value={block.items.join("\n")}
              onChange={(e) => set({ items: e.target.value.split("\n") })}
              onBlur={(e) => set({ items: e.target.value.split("\n").map((v) => v.trim()).filter(Boolean) })}
              className={`${field} resize-y`}
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={!!block.twoCol} onChange={(e) => set({ twoCol: e.target.checked })} className="size-4 rounded" />
            <span className="text-xs font-semibold">Show bullets in two columns</span>
          </label>
        </>
      )}

      {block.kind === "cards" && (
        <>
          <div>
            <label className={label}>Intro (optional)</label>
            <textarea rows={2} value={block.intro ?? ""} onChange={(e) => set({ intro: e.target.value })} className={`${field} resize-y`} />
          </div>
          <div className="space-y-2">
            <label className={label}>Cards</label>
            {block.items.map((item, i) => (
              <div key={i} className="grid sm:grid-cols-[200px_1fr_auto] gap-2 items-start">
                <input
                  value={item.title}
                  placeholder="Card title"
                  onChange={(e) => set({ items: block.items.map((c, j) => (j === i ? { ...c, title: e.target.value } : c)) })}
                  className={field}
                />
                <textarea
                  rows={2}
                  value={item.text}
                  placeholder="Card text"
                  onChange={(e) => set({ items: block.items.map((c, j) => (j === i ? { ...c, text: e.target.value } : c)) })}
                  className={`${field} resize-y`}
                />
                <button type="button" onClick={() => set({ items: block.items.filter((_, j) => j !== i) })} className="p-2.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500">
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => set({ items: [...block.items, { title: "", text: "" }] })} className="text-xs font-bold text-primary hover:underline">
              + Add card
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Staff editors ────────────────────────────────────────────────────────────

function StaffEditor({ staff, onChange }: { staff: DeptStaff[]; onChange: (s: DeptStaff[]) => void }) {
  const set = (i: number, patch: Partial<DeptStaff>) =>
    onChange(staff.map((row, j) => (j === i ? { ...row, ...patch } : row)));

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm min-w-[880px] table-fixed">
          <thead>
            <tr className="bg-secondary text-[11px] uppercase tracking-widest text-muted-foreground">
              <th className="p-3 w-[4%] text-center">#</th>
              <th className="p-3 text-left w-[21%]">Name</th>
              <th className="p-3 text-left w-[23%]">Qualification</th>
              <th className="p-3 text-left w-[19%]">Designation</th>
              <th className="p-3 text-left w-[10%]">Shift</th>
              <th className="p-3 text-left w-[12%]">Email</th>
              <th className="p-3 w-[11%]" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {staff.map((row, i) => (
              <tr key={i} className="hover:bg-secondary/40">
                <td className="p-2 text-center text-xs font-bold text-muted-foreground">{i + 1}</td>
                <td className="p-2"><input className={cellField} value={row.name} onChange={(e) => set(i, { name: e.target.value })} /></td>
                <td className="p-2"><input className={cellField} value={row.qualification} onChange={(e) => set(i, { qualification: e.target.value })} /></td>
                <td className="p-2"><input className={cellField} value={row.designation} onChange={(e) => set(i, { designation: e.target.value })} /></td>
                <td className="p-2">
                  <select value={row.shift} onChange={(e) => set(i, { shift: e.target.value })} className={cellField}>
                    <option value="">—</option>
                    <option value="Shift I">Shift I</option>
                    <option value="Shift II">Shift II</option>
                  </select>
                </td>
                <td className="p-2"><input className={cellField} value={row.email ?? ""} onChange={(e) => set(i, { email: e.target.value })} /></td>
                <td className="p-2">
                  <div className="flex items-center gap-0.5">
                    <button type="button" onClick={() => onChange(move(staff, i, i - 1))} disabled={i === 0} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30"><ArrowUp className="size-3.5" /></button>
                    <button type="button" onClick={() => onChange(move(staff, i, i + 1))} disabled={i === staff.length - 1} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30"><ArrowDown className="size-3.5" /></button>
                    <button type="button" onClick={() => onChange(staff.filter((_, j) => j !== i))} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="size-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr><td colSpan={7} className="p-8 text-center text-sm text-muted-foreground">No staff yet — add the first row below.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={() => onChange([...staff, { sno: staff.length + 1, name: "", qualification: "", designation: "", shift: "Shift I" }])}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-sm font-bold hover:bg-secondary/70"
      >
        <Plus className="size-4" /> Add staff member
      </button>
    </div>
  );
}

function SupervisorEditor({ rows, onChange }: { rows: DeptSupervisor[]; onChange: (s: DeptSupervisor[]) => void }) {
  const set = (i: number, patch: Partial<DeptSupervisor>) =>
    onChange(rows.map((row, j) => (j === i ? { ...row, ...patch } : row)));

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm min-w-[880px] table-fixed">
          <thead>
            <tr className="bg-secondary text-[11px] uppercase tracking-widest text-muted-foreground">
              <th className="p-3 w-[4%] text-center">#</th>
              <th className="p-3 text-left w-[23%]">Name</th>
              <th className="p-3 text-left w-[25%]">Qualification</th>
              <th className="p-3 text-left w-[21%]">Designation</th>
              <th className="p-3 text-left w-[8%]">M.Phil</th>
              <th className="p-3 text-left w-[8%]">Ph.D</th>
              <th className="p-3 w-[11%]" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-secondary/40">
                <td className="p-2 text-center text-xs font-bold text-muted-foreground">{i + 1}</td>
                <td className="p-2"><input className={cellField} value={row.name} onChange={(e) => set(i, { name: e.target.value })} /></td>
                <td className="p-2"><input className={cellField} value={row.qualification} onChange={(e) => set(i, { qualification: e.target.value })} /></td>
                <td className="p-2"><input className={cellField} value={row.designation} onChange={(e) => set(i, { designation: e.target.value })} /></td>
                <td className="p-2">
                  <select value={row.mphil} onChange={(e) => set(i, { mphil: e.target.value })} className={cellField}>
                    <option value="Yes">Yes</option><option value="--">--</option>
                  </select>
                </td>
                <td className="p-2">
                  <select value={row.phd} onChange={(e) => set(i, { phd: e.target.value })} className={cellField}>
                    <option value="Yes">Yes</option><option value="--">--</option>
                  </select>
                </td>
                <td className="p-2">
                  <div className="flex items-center gap-0.5">
                    <button type="button" onClick={() => onChange(move(rows, i, i - 1))} disabled={i === 0} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30"><ArrowUp className="size-3.5" /></button>
                    <button type="button" onClick={() => onChange(move(rows, i, i + 1))} disabled={i === rows.length - 1} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30"><ArrowDown className="size-3.5" /></button>
                    <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="size-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={7} className="p-8 text-center text-sm text-muted-foreground">No research supervisors listed.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={() => onChange([...rows, { sno: rows.length + 1, name: "", qualification: "", designation: "", mphil: "Yes", phd: "--" }])}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-sm font-bold hover:bg-secondary/70"
      >
        <Plus className="size-4" /> Add supervisor
      </button>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

type Tab = "details" | "content" | "staff" | "supervisors";

function AdminDepartmentsPage() {
  const items = Route.useLoaderData() as Department[];
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [tab, setTab] = useState<Tab>("details");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const set = (patch: Partial<Draft>) => setDraft((d) => (d ? { ...d, ...patch } : d));

  function openNew() {
    setDraft({ ...EMPTY, order: items.length });
    setTab("details");
    setError("");
  }

  function openEdit(dept: Department) {
    setDraft({
      ...dept,
      blocks: (dept.blocks ?? []) as DeptBlock[],
      staff: (dept.staff ?? []) as DeptStaff[],
      supervisors: (dept.supervisors ?? []) as DeptSupervisor[],
      aliases: (dept.aliases ?? []) as string[],
    });
    setTab("details");
    setError("");
  }

  async function handleSave(close = false) {
    if (!draft) return;
    if (!draft.name.trim()) { setError("Department name is required."); setTab("details"); return; }
    const slug = slugify(draft.slug || draft.name);
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...draft,
        slug,
        // Renumber the tables so the printed SL. NO always matches row order.
        staff: draft.staff.map((s, i) => ({ ...s, sno: i + 1 })),
        supervisors: draft.supervisors.map((s, i) => ({ ...s, sno: i + 1 })),
      };
      const saved = await saveDepartment({ data: payload });
      await router.invalidate();
      setSavedAt(Date.now());
      if (close) setDraft(null);
      else setDraft({ ...saved, blocks: (saved.blocks ?? []) as DeptBlock[], staff: (saved.staff ?? []) as DeptStaff[], supervisors: (saved.supervisors ?? []) as DeptSupervisor[], aliases: (saved.aliases ?? []) as string[] });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(dept: Department) {
    if (!confirm(`Delete the ${dept.name} department page? This cannot be undone.`)) return;
    await deleteDepartment({ data: { id: dept.id } });
    router.invalidate();
  }

  async function toggleActive(dept: Department) {
    await saveDepartment({ data: { ...dept, active: !dept.active } });
    router.invalidate();
  }

  async function reorder(index: number, dir: -1 | 1) {
    const next = move(items, index, index + dir);
    if (next === items) return;
    await reorderDepartments({ data: { ids: next.map((d) => d.id) } });
    router.invalidate();
  }

  // ── List view ──────────────────────────────────────────────────────────────
  if (!draft) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Departments</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {items.length} department pages — edit the page content and the staff table for each.
            </p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
            <Plus className="size-4" /> New Department
          </button>
        </div>

        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center space-y-2">
            <GraduationCap className="size-8 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">
              No departments in the database yet. Run <code className="font-mono">npm run db:seed:departments</code> to
              import the existing pages, or create one manually.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {items.map((dept, i) => {
            const Icon = getIcon(dept.icon);
            const staffCount = ((dept.staff ?? []) as DeptStaff[]).length;
            const blockCount = ((dept.blocks ?? []) as DeptBlock[]).length;
            return (
              <div key={dept.id} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
                <div className="size-11 rounded-xl bg-primary/5 grid place-items-center text-primary shrink-0">
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-foreground">{dept.name}</h3>
                    {dept.code && <span className="text-[10px] font-bold uppercase tracking-widest text-gold-deep">{dept.code}</span>}
                    {!dept.active && <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] font-bold">Hidden</span>}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    /departments/{dept.slug} · {blockCount} content block{blockCount === 1 ? "" : "s"} · {staffCount} staff
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => reorder(i, -1)} disabled={i === 0} className="p-2 rounded-lg hover:bg-secondary disabled:opacity-30" title="Move up"><ArrowUp className="size-4" /></button>
                  <button onClick={() => reorder(i, 1)} disabled={i === items.length - 1} className="p-2 rounded-lg hover:bg-secondary disabled:opacity-30" title="Move down"><ArrowDown className="size-4" /></button>
                  <button onClick={() => toggleActive(dept)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground" title={dept.active ? "Hide from site" : "Show on site"}>
                    {dept.active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                  </button>
                  <button onClick={() => openEdit(dept)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground" title="Edit"><Pencil className="size-4" /></button>
                  <button onClick={() => handleDelete(dept)} className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500" title="Delete"><Trash2 className="size-4" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Editor view ────────────────────────────────────────────────────────────
  const TABS: { id: Tab; label: string; icon: typeof Info; count?: number }[] = [
    { id: "details", label: "Details", icon: Info },
    { id: "content", label: "Page content", icon: LayoutList, count: draft.blocks.length },
    { id: "staff", label: "Staff details", icon: Users, count: draft.staff.length },
    { id: "supervisors", label: "Supervisors", icon: GraduationCap, count: draft.supervisors.length },
  ];

  return (
    <div className="p-8 pb-28">
      <button onClick={() => setDraft(null)} className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="size-4" /> Back to departments
      </button>

      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">{draft.id ? draft.name || "Untitled department" : "New department"}</h1>
          <p className="text-muted-foreground text-sm mt-1">/departments/{slugify(draft.slug || draft.name) || "…"}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {TABS.map(({ id, label: text, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-t-xl border-b-2 -mb-px transition-colors ${
              tab === id ? "border-gold text-primary bg-secondary/60" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="size-4" /> {text}
            {count !== undefined && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary">{count}</span>}
          </button>
        ))}
      </div>

      {tab === "details" && (
        <div className="grid lg:grid-cols-2 gap-5 max-w-4xl">
          <div>
            <label className={label}>Department name *</label>
            <input value={draft.name} onChange={(e) => set({ name: e.target.value })} className={field} placeholder="Mathematics" />
          </div>
          <div>
            <label className={label}>URL slug</label>
            <input value={draft.slug} onChange={(e) => set({ slug: e.target.value })} onBlur={(e) => set({ slug: slugify(e.target.value || draft.name) })} className={field} placeholder="mathematics" />
          </div>
          <div>
            <label className={label}>Degree code</label>
            <input value={draft.code} onChange={(e) => set({ code: e.target.value })} className={field} placeholder="B.Sc" />
          </div>
          <div>
            <label className={label}>Card icon</label>
            <select value={draft.icon} onChange={(e) => set({ icon: e.target.value })} className={field}>
              {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className={label}>Card summary — shown on the home page and departments list</label>
            <textarea rows={2} value={draft.summary} onChange={(e) => set({ summary: e.target.value })} className={`${field} resize-y`} />
          </div>
          <div>
            <label className={label}>Hero eyebrow</label>
            <input value={draft.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} className={field} placeholder="Department of Basic Sciences" />
          </div>
          <div>
            <label className={label}>Hero title</label>
            <input value={draft.heroTitle} onChange={(e) => set({ heroTitle: e.target.value })} className={field} placeholder="Department of Mathematics" />
          </div>
          <div className="lg:col-span-2">
            <label className={label}>Hero subtitle</label>
            <textarea rows={2} value={draft.heroSubtitle} onChange={(e) => set({ heroSubtitle: e.target.value })} className={`${field} resize-y`} />
          </div>
          <div>
            <label className={label}>Alternate slugs — comma separated, for old links</label>
            <input
              value={draft.aliases.join(", ")}
              onChange={(e) => set({ aliases: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })}
              className={field}
              placeholder="maths, math"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer pb-2.5">
              <input type="checkbox" checked={draft.active} onChange={(e) => set({ active: e.target.checked })} className="size-4 rounded" />
              <span className="text-sm font-medium">Visible on the website</span>
            </label>
          </div>
        </div>
      )}

      {tab === "content" && (
        <div className="space-y-4 max-w-4xl">
          {draft.blocks.map((block, i) => (
            <BlockEditor
              key={i}
              block={block}
              index={i}
              total={draft.blocks.length}
              onChange={(b) => set({ blocks: draft.blocks.map((x, j) => (j === i ? b : x)) })}
              onRemove={() => set({ blocks: draft.blocks.filter((_, j) => j !== i) })}
              onMove={(dir) => set({ blocks: move(draft.blocks, i, i + dir) })}
            />
          ))}
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => set({ blocks: [...draft.blocks, { kind: "text", heading: "New section", body: "" }] })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-sm font-bold hover:bg-secondary/70">
              <Plus className="size-4" /> Text section
            </button>
            <button type="button" onClick={() => set({ blocks: [...draft.blocks, { kind: "list", heading: "New list", items: [] }] })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-sm font-bold hover:bg-secondary/70">
              <Plus className="size-4" /> Bullet list
            </button>
            <button type="button" onClick={() => set({ blocks: [...draft.blocks, { kind: "cards", heading: "New highlights", items: [] }] })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-sm font-bold hover:bg-secondary/70">
              <Plus className="size-4" /> Highlight cards
            </button>
          </div>
        </div>
      )}

      {tab === "staff" && (
        <div className="space-y-4">
          <div className="max-w-md">
            <label className={label}>Staff table heading</label>
            <input value={draft.staffHeading} onChange={(e) => set({ staffHeading: e.target.value })} className={field} placeholder={`Faculty Registry for ${draft.name || "…"}`} />
          </div>
          <StaffEditor staff={draft.staff} onChange={(staff) => set({ staff })} />
        </div>
      )}

      {tab === "supervisors" && (
        <div className="space-y-4">
          <div className="max-w-md">
            <label className={label}>Supervisors table heading</label>
            <input value={draft.supervisorsHeading} onChange={(e) => set({ supervisorsHeading: e.target.value })} className={field} placeholder="Approved Research Supervisors (M.Phil. / Ph.D.)" />
          </div>
          <SupervisorEditor rows={draft.supervisors} onChange={(supervisors) => set({ supervisors })} />
        </div>
      )}

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 z-20 bg-card/95 backdrop-blur border-t border-border px-4 sm:px-8 py-4 flex flex-wrap items-center gap-3">
        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        {!error && savedAt && <p className="text-sm text-green-600 font-medium">Saved — changes are live on the site.</p>}
        <div className="ml-auto flex items-center gap-3">
          <button onClick={() => setDraft(null)} className="px-5 py-2.5 rounded-xl border border-border text-sm font-bold hover:bg-secondary">Close</button>
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-sm font-bold hover:bg-secondary/70 disabled:opacity-60">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60">
            Save & close
          </button>
        </div>
      </div>
    </div>
  );
}
