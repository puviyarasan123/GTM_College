import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Reveal } from "@/components/site/PageShell";
import { SITE } from "@/lib/site-data";
import { FileDown, Search, FolderOpen, BookOpen, GraduationCap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/courses/e-materials")({
  head: () => ({
    meta: [
      { title: `E-Learning Materials Hub — ${SITE.name}` },
      { name: "description", content: `Access and download digital study notes, question banks, and electronic lecture materials at ${SITE.name}, Gudiyattam.` },
    ],
  }),
  component: EMaterialsPage,
});

const eMaterialsRegistry = [
  { sno: 1, department: "Tamil", stream: "Arts", notesCount: "Placeholder Notes" },
  { sno: 2, department: "English", stream: "Arts", notesCount: "Placeholder Notes" },
  { sno: 3, department: "Economics", stream: "Arts", notesCount: "Placeholder Notes" },
  { sno: 4, department: "History", stream: "Arts", notesCount: "Placeholder Notes" },
  { sno: 5, department: "Commerce", stream: "Commerce", notesCount: "Placeholder Notes" },
  { sno: 6, department: "Business Administration (BBA)", stream: "Management", notesCount: "Placeholder Notes" },
  { sno: 7, department: "Mathematics", stream: "Science", notesCount: "Placeholder Notes" },
  { sno: 8, department: "Computer Applications (BCA)", stream: "Science", notesCount: "Placeholder Notes" },
  { sno: 9, department: "Computer Science", stream: "Science", notesCount: "Placeholder Notes" },
  { sno: 10, department: "Physics", stream: "Science", notesCount: "Placeholder Notes" },
  { sno: 11, department: "Chemistry", stream: "Science", notesCount: "Placeholder Notes" },
  { sno: 12, department: "Botany", stream: "Science", notesCount: "Placeholder Notes" },
  { sno: 13, department: "Zoology", stream: "Science", notesCount: "Placeholder Notes" },
];

function EMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Filters departments based on type tab selection and manual string queries
  const filteredMaterials = eMaterialsRegistry.filter((item) => {
    const matchesSearch = item.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab ? item.stream === activeTab : true;
    return matchesSearch && matchesTab;
  });

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="E-Learning Resource Hub"
        subtitle="Access institutional study modules, online digital syllabi, reference files, and distributed question banks organized by department faculties."
      />

      {/* Control Panel: Search & Stream Filter Blocks */}
      <Section className="pb-0">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card border border-border p-4 rounded-2xl shadow-sm">
            
            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search department materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Segmented Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {[
                { id: null, label: "All Repositories" },
                { id: "Science", label: "Sciences" },
                { id: "Arts", label: "Arts & Lit" },
                { id: "Commerce", label: "Commerce" },
                { id: "Management", label: "Management" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-primary border-primary text-primary-foreground shadow-sm"
                      : "bg-background border-border text-muted-foreground hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Materials Directory Table Section */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
              <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                <FolderOpen className="size-5 text-gold-deep" />
                <h2 className="font-bold text-primary text-base">Digital Learning Repositories</h2>
              </div>

              {filteredMaterials.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4 font-semibold w-16 text-center">S.No</th>
                        <th className="p-4 font-semibold">Academic Department</th>
                        <th className="p-4 font-semibold">Classification Stream</th>
                        <th className="p-4 font-semibold text-center w-40">Resource Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {filteredMaterials.map((item, index) => (
                        <tr key={item.sno} className="hover:bg-muted/10 transition-colors group">
                          
                          {/* Normalized Index Tracking */}
                          <td className="p-4 text-center font-medium text-muted-foreground bg-muted/5 group-hover:bg-transparent">
                            {index + 1}
                          </td>
                          
                          {/* Department Label */}
                          <td className="p-4 font-bold text-primary tracking-wide flex items-center gap-2">
                            <BookOpen className="size-3.5 text-gold-deep opacity-60" />
                            <span>Department of {item.department}</span>
                          </td>

                          {/* Stream Classification Badges */}
                          <td className="p-4">
                            <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded border ${
                              item.stream === "Science" ? "bg-blue-500/5 text-blue-600 border-blue-500/10" :
                              item.stream === "Arts" ? "bg-amber-500/5 text-amber-600 border-amber-500/10" :
                              item.stream === "Commerce" ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/10" :
                              "bg-purple-500/5 text-purple-600 border-purple-500/10"
                            }`}>
                              {item.stream}
                            </span>
                          </td>
                          
                          {/* Resource Entry Action Buttons */}
                          <td className="p-4 text-center">
                            <button
                              onClick={() => alert(`The e-learning document repository placeholder for the Department of ${item.department} is currently empty. You can replace this alert trigger with your real storage endpoint configuration later!`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-secondary hover:bg-gold hover:text-secondary-foreground text-secondary-foreground rounded-xl transition-all border border-border shadow-sm group-hover:scale-105"
                            >
                              <FileDown className="size-3.5" /> Access Notes
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Filter Empty Fallback Message Area */
                <div className="p-12 text-center text-muted-foreground space-y-2">
                  <GraduationCap className="size-8 mx-auto text-muted-foreground/40 stroke-1" />
                  <p className="text-sm font-medium">No matching departmental repositories found</p>
                  <p className="text-xs text-muted-foreground/70">Refine your manual search keyword terms or choose another active stream tab category.</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}