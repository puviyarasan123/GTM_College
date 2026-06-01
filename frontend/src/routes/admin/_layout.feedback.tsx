import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, GripVertical, Settings, MessageSquare } from "lucide-react";
import {
  getFeedbackAdminForms, saveFeedbackForm, getFeedbackResponses, deleteFeedbackResponse,
  type FeedbackCategory, type FeedbackField, type FeedbackForm, type FeedbackResponse,
} from "@/lib/admin-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_layout/feedback")({
  component: AdminFeedbackPage,
});

const CATEGORIES: { value: FeedbackCategory; label: string }[] = [
  { value: "STUDENT", label: "Student" },
  { value: "PARENT", label: "Parents" },
  { value: "ALUMNI", label: "Alumni" },
  { value: "TEACHER_PUBLIC", label: "Teachers / Public" },
];

const FIELD_TYPES = ["text", "textarea", "select", "radio", "rating"] as const;

function newField(): FeedbackField {
  return { id: crypto.randomUUID(), label: "", type: "text", required: false, options: [] };
}

// ── Form Builder ──────────────────────────────────────────────────────────────
function FormBuilder({ category, form }: { category: FeedbackCategory; form?: FeedbackForm }) {
  const qc = useQueryClient();
  const [fields, setFields] = useState<FeedbackField[]>(form?.fields ?? []);
  const [active, setActive] = useState(form?.active ?? true);

  const save = useMutation({
    mutationFn: saveFeedbackForm,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["feedback-admin-forms"] }); toast.success("Form saved!"); },
    onError: (e: Error) => toast.error(e.message),
  });

  function updateField(id: string, patch: Partial<FeedbackField>) {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  function removeField(id: string) {
    setFields((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch checked={active} onCheckedChange={setActive} id="form-active" />
          <Label htmlFor="form-active">Form Active</Label>
        </div>
        <Button size="sm" onClick={() => setFields((p) => [...p, newField()])}>
          <Plus className="size-4 mr-1" /> Add Field
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-center text-muted-foreground py-6 border-2 border-dashed rounded-lg">
          No fields yet. Click "Add Field" to start building the form.
        </p>
      )}

      <div className="space-y-3">
        {fields.map((field, idx) => (
          <Card key={field.id} className="border">
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-center gap-2">
                <GripVertical className="size-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground font-mono">#{idx + 1}</span>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Field label"
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                  />
                  <Select value={field.type} onValueChange={(v) => updateField(field.id, { type: v as FeedbackField["type"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {FIELD_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-1">
                  <Switch
                    checked={field.required}
                    onCheckedChange={(v) => updateField(field.id, { required: v })}
                    id={`req-${field.id}`}
                  />
                  <Label htmlFor={`req-${field.id}`} className="text-xs">Req</Label>
                </div>
                <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => removeField(field.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>

              {(field.type === "select" || field.type === "radio") && (
                <div className="ml-6 space-y-1">
                  <Label className="text-xs text-muted-foreground">Options (one per line)</Label>
                  <textarea
                    className="w-full border rounded-md p-2 text-sm min-h-[80px] resize-none"
                    placeholder="Option 1&#10;Option 2&#10;Option 3"
                    value={(field.options ?? []).join("\n")}
                    onChange={(e) => updateField(field.id, { options: e.target.value.split("\n").filter(Boolean) })}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        className="w-full"
        disabled={save.isPending}
        onClick={() => save.mutate({ data: { category, fields, active } })}
      >
        {save.isPending ? "Saving..." : "Save Form"}
      </Button>
    </div>
  );
}

// ── Responses Viewer ──────────────────────────────────────────────────────────
function ResponsesViewer({ category, form }: { category: FeedbackCategory; form?: FeedbackForm }) {
  const qc = useQueryClient();
  const { data: responses = [], isLoading } = useQuery({
    queryKey: ["feedback-responses", category],
    queryFn: () => getFeedbackResponses(category),
  });

  const del = useMutation({
    mutationFn: deleteFeedbackResponse,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["feedback-responses", category] }),
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-center py-8 text-muted-foreground">Loading...</p>;
  if (responses.length === 0) return <p className="text-center py-8 text-muted-foreground">No responses yet.</p>;

  const fields: FeedbackField[] = form?.fields ?? [];

  return (
    <div className="space-y-3">
      {responses.map((r: FeedbackResponse) => (
        <Card key={r.id}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <span className="text-xs text-muted-foreground">{new Date(r.submittedAt).toLocaleString()}</span>
            <Button
              size="icon" variant="ghost" className="text-red-500 hover:text-red-600 size-7"
              onClick={() => del.mutate({ data: { id: r.id } })}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {fields.length > 0
              ? fields.map((f) => (
                  <div key={f.id} className="grid grid-cols-3 gap-2 text-sm">
                    <span className="font-medium text-muted-foreground">{f.label}</span>
                    <span className="col-span-2">{(r.data as Record<string, string>)[f.id] ?? "—"}</span>
                  </div>
                ))
              : Object.entries(r.data as Record<string, string>).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 gap-2 text-sm">
                    <span className="font-medium text-muted-foreground">{k}</span>
                    <span className="col-span-2">{v}</span>
                  </div>
                ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
function AdminFeedbackPage() {
  const [tab, setTab] = useState<"responses" | "builder">("responses");
  const { data: forms = [] } = useQuery({
    queryKey: ["feedback-admin-forms"],
    queryFn: getFeedbackAdminForms,
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Feedback Management</h1>
        <p className="text-muted-foreground text-sm">Monitor responses and configure feedback forms</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map((c) => {
          const form = forms.find((f) => f.category === c.value);
          return (
            <Card key={c.value}>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{form?._count?.responses ?? 0}</div>
                <div className="text-xs text-muted-foreground">{c.label}</div>
                <Badge variant={form?.active ? "default" : "secondary"} className="mt-1 text-[10px]">
                  {form?.active ? "Active" : "Inactive"}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <Button variant={tab === "responses" ? "default" : "outline"} size="sm" onClick={() => setTab("responses")}>
          <MessageSquare className="size-4 mr-1" /> Responses
        </Button>
        <Button variant={tab === "builder" ? "default" : "outline"} size="sm" onClick={() => setTab("builder")}>
          <Settings className="size-4 mr-1" /> Form Builder
        </Button>
      </div>

      <Tabs defaultValue="STUDENT">
        <TabsList className="grid grid-cols-4 mb-4">
          {CATEGORIES.map((c) => (
            <TabsTrigger key={c.value} value={c.value} className="text-xs">{c.label}</TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((c) => {
          const form = forms.find((f) => f.category === c.value);
          return (
            <TabsContent key={c.value} value={c.value}>
              {tab === "responses"
                ? <ResponsesViewer category={c.value} form={form} />
                : <FormBuilder category={c.value} form={form} />}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
