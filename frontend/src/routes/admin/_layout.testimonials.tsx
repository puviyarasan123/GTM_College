import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/content-fns";
import type { Testimonial } from "@/lib/content-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_layout/testimonials")({
  component: AdminTestimonialsPage,
});

const EMPTY: Omit<Testimonial, "id"> = { name: "", batch: "", company: "", quote: "", order: 0, active: true };

function TestimonialForm({
  initial, onSave, onCancel, saving,
}: {
  initial: Omit<Testimonial, "id">;
  onSave: (d: Omit<Testimonial, "id">) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [d, setD] = useState(initial);
  const set = (k: keyof typeof d, v: string | number | boolean) => setD((p) => ({ ...p, [k]: v }));

  return (
    <Card className="border-primary/30">
      <CardContent className="pt-4 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Name</Label>
            <Input value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Priya S." />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Batch / Programme</Label>
            <Input value={d.batch} onChange={(e) => set("batch", e.target.value)} placeholder="e.g. B.Sc. CS, 2023" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Company / Role</Label>
            <Input value={d.company} onChange={(e) => set("company", e.target.value)} placeholder="e.g. Software Developer, TCS" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Display Order</Label>
            <Input type="number" value={d.order} onChange={(e) => set("order", Number(e.target.value))} />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Quote</Label>
          <Textarea value={d.quote} onChange={(e) => set("quote", e.target.value)} rows={3} placeholder="Their testimonial..." />
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={d.active} onCheckedChange={(v) => set("active", v)} id="t-active" />
          <Label htmlFor="t-active" className="text-xs">Active (visible on site)</Label>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={onCancel}><X className="size-3.5 mr-1" />Cancel</Button>
          <Button size="sm" disabled={saving || !d.name || !d.quote} onClick={() => onSave(d)}>
            <Check className="size-3.5 mr-1" />{saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminTestimonialsPage() {
  const qc = useQueryClient();
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: getAllTestimonials,
  });

  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-testimonials"] });

  const create = useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => { invalidate(); setAdding(false); toast.success("Testimonial added!"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: updateTestimonial,
    onSuccess: () => { invalidate(); setEditId(null); toast.success("Updated!"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => { invalidate(); toast.success("Deleted!"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alumni Testimonials</h1>
          <p className="text-muted-foreground text-sm">Manage "Stories from our graduates" shown on the homepage.</p>
        </div>
        {!adding && (
          <Button size="sm" onClick={() => setAdding(true)}>
            <Plus className="size-4 mr-1" /> Add Testimonial
          </Button>
        )}
      </div>

      {adding && (
        <TestimonialForm
          initial={EMPTY}
          onSave={(d) => create.mutate({ data: d })}
          onCancel={() => setAdding(false)}
          saving={create.isPending}
        />
      )}

      {isLoading && <p className="text-muted-foreground text-sm">Loading...</p>}

      <div className="space-y-3">
        {testimonials.map((t) =>
          editId === t.id ? (
            <TestimonialForm
              key={t.id}
              initial={{ name: t.name, batch: t.batch, company: t.company, quote: t.quote, order: t.order, active: t.active }}
              onSave={(d) => update.mutate({ data: { id: t.id, ...d } })}
              onCancel={() => setEditId(null)}
              saving={update.isPending}
            />
          ) : (
            <Card key={t.id} className={!t.active ? "opacity-50" : ""}>
              <CardContent className="pt-4 flex gap-4 items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.batch}</span>
                    <span className="text-xs text-gold-deep font-semibold">{t.company}</span>
                    {!t.active && <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full">Hidden</span>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">"{t.quote}"</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="icon" variant="ghost" className="size-8" onClick={() => setEditId(t.id)}>
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    size="icon" variant="ghost" className="size-8 text-red-500 hover:text-red-600"
                    onClick={() => del.mutate({ data: { id: t.id } })}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
