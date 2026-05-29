import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { listStudents } from "@/lib/admin-fns";
import { Search, GraduationCap, FileText } from "lucide-react";

type Student = Awaited<ReturnType<typeof listStudents>>[number];

export const Route = createFileRoute("/admin/_layout/students")({
  loader: () => listStudents(),
  component: StudentsPage,
});

function StudentsPage() {
  const initial = Route.useLoaderData();
  const [students, setStudents] = useState<Student[]>(initial);
  const [search, setSearch] = useState("");

  async function handleSearch(q: string) {
    setSearch(q);
    const data = await listStudents(q || undefined);
    setStudents(data);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground">Registered Students</h1>
        <p className="text-muted-foreground text-sm mt-1">{students.length} students registered</p>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name, email or phone…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              {["Student", "Phone", "Applications", "Registered"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-secondary/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-primary/10 grid place-items-center text-primary font-bold text-sm shrink-0">
                      {s.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{s.phone}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${s._count.applications > 0 ? "bg-green-50 text-green-700" : "bg-secondary text-muted-foreground"}`}>
                    <FileText className="size-3" /> {s._count.applications} application{s._count.applications !== 1 ? "s" : ""}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-muted-foreground">
                  {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-muted-foreground">
                  <GraduationCap className="size-10 mx-auto mb-3 opacity-30" />
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
