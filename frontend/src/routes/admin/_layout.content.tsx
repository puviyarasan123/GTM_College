import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getSiteContent, upsertSiteContent } from "@/lib/content-fns";
import { Save, ChevronDown, ChevronUp } from "lucide-react";

const SECTIONS = [
  {
    key: "hero",
    label: "Hero Slides",
    description: "Edit the 3 hero banner slides (eyebrow, title, subtitle)",
    defaultValue: JSON.stringify([
      { eyebrow: "Admissions 2025–26 Open", title: "Engineering the future of global technology.", sub: "Join India's most ambitious engineering community." },
      { eyebrow: "NAAC A++ Accredited", title: "Where knowledge becomes craft.", sub: "Half a million digital journals. 250+ PhD faculty." },
      { eyebrow: "Industry-Grade Labs", title: "Build what the world needs next.", sub: "NVIDIA compute, robotics suites, biotech wet labs." },
    ], null, 2),
  },
  {
    key: "stats",
    label: "Stats Bar",
    description: "The 4 animated counters below the hero",
    defaultValue: JSON.stringify([
      { value: 15000, suffix: "+", label: "Active Students" },
      { value: 250, suffix: "+", label: "PhD Faculty" },
      { value: 98, suffix: "%", label: "Placement Rate" },
      { value: 450, suffix: "+", label: "Recruiting Partners" },
    ], null, 2),
  },
  {
    key: "about",
    label: "About Section",
    description: "About text, highlights and established year",
    defaultValue: JSON.stringify({
      eyebrow: "About the Institute",
      title: "A legacy of engineering excellence since 1994.",
      body: "GTM COLLEGE stands as one of India's most ambitious engineering communities.",
      estd: "1994",
      years: "30+",
    }, null, 2),
  },
  {
    key: "placement",
    label: "Placement Highlights",
    description: "Placement stats shown in the dark section",
    defaultValue: JSON.stringify([
      { value: "₹54 LPA", label: "Highest Package 2024" },
      { value: "₹9.8 LPA", label: "Average Package" },
      { value: "98.4%", label: "Placement Rate" },
      { value: "450+", label: "Companies Visited" },
    ], null, 2),
  },
  {
    key: "contact",
    label: "Contact Info",
    description: "Phone, email, address shown in footer and contact page",
    defaultValue: JSON.stringify({
      phone: "+91 44 2837 4500",
      email: "admissions@gtmc.edu.in",
      address: "University Road, Academic District, Chennai, Tamil Nadu 600119",
    }, null, 2),
  },
];

export const Route = createFileRoute("/admin/_layout/content")({
  loader: async () => {
    const results = await Promise.all(
      SECTIONS.map((s) => getSiteContent({ data: { section: s.key } }))
    );
    return Object.fromEntries(SECTIONS.map((s, i) => [s.key, results[i]]));
  },
  component: ContentPage,
});

function ContentPage() {
  const loaderData = Route.useLoaderData();
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      SECTIONS.map((s) => [
        s.key,
        loaderData[s.key] ? JSON.stringify((loaderData[s.key] as { data: unknown }).data, null, 2) : s.defaultValue,
      ])
    )
  );
  const [saving, setSaving] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSave(key: string) {
    setErrors((e) => ({ ...e, [key]: "" }));
    let parsed: unknown;
    try {
      parsed = JSON.parse(values[key]);
    } catch {
      setErrors((e) => ({ ...e, [key]: "Invalid JSON — please fix before saving." }));
      return;
    }
    setSaving(key);
    try {
      await upsertSiteContent({ data: { section: key, data: parsed as Record<string, unknown> } });
      router.invalidate();
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground">Site Content</h1>
        <p className="text-muted-foreground text-sm mt-1">Edit dynamic content sections. Changes go live immediately.</p>
      </div>

      <div className="space-y-3">
        {SECTIONS.map((section) => (
          <div key={section.key} className="bg-card rounded-2xl border border-border overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === section.key ? null : section.key)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors"
            >
              <div>
                <div className="font-bold text-foreground">{section.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{section.description}</div>
              </div>
              {expanded === section.key ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
            </button>

            {expanded === section.key && (
              <div className="px-5 pb-5 border-t border-border">
                <div className="mt-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">JSON Data</label>
                  <textarea
                    rows={12}
                    value={values[section.key]}
                    onChange={(e) => setValues({ ...values, [section.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold resize-y"
                    spellCheck={false}
                  />
                  {errors[section.key] && (
                    <p className="mt-2 text-sm text-red-500">{errors[section.key]}</p>
                  )}
                  <button
                    onClick={() => handleSave(section.key)}
                    disabled={saving === section.key}
                    className="mt-3 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60"
                  >
                    <Save className="size-4" />
                    {saving === section.key ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
