import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listEnquiries, markEnquiryRead, deleteEnquiry, getEnquiryStats } from "@/lib/admin-fns";
import type { EnquiryItem } from "@/lib/admin-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, MailOpen, Mail, Phone, BookOpen, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_layout/enquiries")({
  component: AdminEnquiriesPage,
});

const SOURCE_LABEL: Record<string, string> = {
  homepage: "Quick Enquiry",
  contact: "Contact Form",
};

function EnquiryCard({ enquiry }: { enquiry: EnquiryItem }) {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-enquiries"] });
    qc.invalidateQueries({ queryKey: ["enquiry-stats"] });
  };

  const markRead = useMutation({
    mutationFn: markEnquiryRead,
    onSuccess: invalidate,
  });

  const del = useMutation({
    mutationFn: deleteEnquiry,
    onSuccess: () => { invalidate(); toast.success("Deleted"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Card className={!enquiry.read ? "border-primary/40 bg-primary/[0.02]" : ""}>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {!enquiry.read && <span className="size-2 rounded-full bg-primary shrink-0 mt-1" />}
            <span className="font-bold text-sm">{enquiry.name}</span>
            <Badge variant="secondary" className="text-[10px]">
              {SOURCE_LABEL[enquiry.source] ?? enquiry.source}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(enquiry.submittedAt).toLocaleString()}
            </span>
          </div>
          <div className="flex gap-1">
            {!enquiry.read && (
              <Button
                size="icon" variant="ghost" className="size-8 text-primary"
                onClick={() => markRead.mutate({ data: { id: enquiry.id } })}
                title="Mark as read"
              >
                <MailOpen className="size-3.5" />
              </Button>
            )}
            <Button
              size="icon" variant="ghost" className="size-8 text-red-500 hover:text-red-600"
              onClick={() => del.mutate({ data: { id: enquiry.id } })}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Mail className="size-3.5 shrink-0" />
            <a href={`mailto:${enquiry.email}`} className="hover:text-primary truncate">{enquiry.email}</a>
          </div>
          {enquiry.phone && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Phone className="size-3.5 shrink-0" />
              <span>{enquiry.phone}</span>
            </div>
          )}
          {enquiry.course && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <BookOpen className="size-3.5 shrink-0" />
              <span className="truncate">{enquiry.course}</span>
            </div>
          )}
        </div>

        <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
          <MessageSquare className="size-3.5 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{enquiry.message}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminEnquiriesPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const qc = useQueryClient();

  const { data: stats } = useQuery({
    queryKey: ["enquiry-stats"],
    queryFn: getEnquiryStats,
  });

  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ["admin-enquiries", filter],
    queryFn: () => listEnquiries(filter === "unread"),
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      const unread = enquiries.filter((e) => !e.read);
      await Promise.all(unread.map((e) => markEnquiryRead({ data: { id: e.id } })));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-enquiries"] });
      qc.invalidateQueries({ queryKey: ["enquiry-stats"] });
      toast.success("All marked as read");
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Enquiries</h1>
          <p className="text-muted-foreground text-sm">Submissions from Quick Enquiry & Contact forms</p>
        </div>
        {(stats?.unread ?? 0) > 0 && (
          <Button variant="outline" size="sm" onClick={() => markAllRead.mutate()} disabled={markAllRead.isPending}>
            <MailOpen className="size-4 mr-1" /> Mark all read
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: stats?.total ?? 0 },
          { label: "Unread", value: stats?.unread ?? 0, highlight: true },
          { label: "Quick Enquiry", value: enquiries.filter((e) => e.source === "homepage").length },
          { label: "Contact Form", value: enquiries.filter((e) => e.source === "contact").length },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-4">
              <div className={`text-2xl font-bold ${s.highlight && s.value > 0 ? "text-primary" : ""}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "unread"] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : `Unread${stats?.unread ? ` (${stats.unread})` : ""}`}
          </Button>
        ))}
      </div>

      {isLoading && <p className="text-muted-foreground text-sm">Loading...</p>}
      {!isLoading && enquiries.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No enquiries yet.</p>
      )}

      <div className="space-y-3">
        {enquiries.map((e) => <EnquiryCard key={e.id} enquiry={e} />)}
      </div>
    </div>
  );
}
