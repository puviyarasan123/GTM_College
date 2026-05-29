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
      { eyebrow: "Admissions 2025–26 Open", title: "Empowering Minds, Shaping Futures.", sub: "Join GTM College of Arts & Science — quality education in Science, Arts, Commerce and Management." },
      { eyebrow: "NAAC 'A' Grade Accredited", title: "Where knowledge meets opportunity.", sub: "Extensive library resources, experienced faculty and a vibrant campus life to nurture your potential." },
      { eyebrow: "Modern Laboratories", title: "Discover. Explore. Innovate.", sub: "Well-equipped science labs, computer centres and research facilities to fuel your academic journey." },
    ], null, 2),
  },
  {
    key: "stats",
    label: "Stats Bar",
    description: "The 4 animated counters below the hero",
    defaultValue: JSON.stringify([
      { value: 8000, suffix: "+", label: "Active Students" },
      { value: 180, suffix: "+", label: "Qualified Faculty" },
      { value: 92, suffix: "%", label: "Placement Rate" },
      { value: 180, suffix: "+", label: "Recruiting Partners" },
    ], null, 2),
  },
  {
    key: "about",
    label: "About Section",
    description: "About text, highlights and established year",
    defaultValue: JSON.stringify({
      eyebrow: "About the Institute",
      title: "A legacy of academic excellence since 1994.",
      body: "GTM College of Arts & Science is a premier institution in Coimbatore, affiliated to Bharathiar University.",
      estd: "1994",
      years: "30+",
    }, null, 2),
  },
  {
    key: "placement",
    label: "Placement Highlights",
    description: "Placement stats shown in the dark section",
    defaultValue: JSON.stringify([
      { value: "₹12 LPA", label: "Highest Package 2024" },
      { value: "₹4.2 LPA", label: "Average Package" },
      { value: "92%", label: "Placement Rate" },
      { value: "180+", label: "Companies Visited" },
    ], null, 2),
  },
  {
    key: "contact",
    label: "Contact Info",
    description: "Phone, email, address shown in footer and contact page",
    defaultValue: JSON.stringify({
      phone: "+91 422 2539 500",
      email: "admissions@gtmc.edu.in",
      address: "Saravanampatti, Coimbatore, Tamil Nadu 641035",
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
