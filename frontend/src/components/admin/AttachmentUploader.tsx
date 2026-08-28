import { useRef, useState } from "react";
import { uploadFile } from "@/lib/content-fns";
import type { Attachment } from "@/lib/content-fns";
import { FileText, ImageIcon, Loader2, Paperclip, Trash2, Upload } from "lucide-react";

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/*";

function isImage(type: string, url: string) {
  return type.startsWith("image/") || /\.(jpe?g|png|webp|gif)$/i.test(url);
}

/**
 * Upload button + attachment list used by the News and Events editors.
 * Accepts PDFs and images; files go to Cloudinary and are stored on the record
 * as `{ name, url, type }`.
 */
export function AttachmentUploader({
  value, onChange, folder = "gtmc/uploads", label = "Attachments",
}: {
  value: Attachment[];
  onChange: (files: Attachment[]) => void;
  folder?: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setError("");
    const tooBig = files.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      setError(`“${tooBig.name}” is larger than 10MB.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setUploading(true);
    try {
      const uploaded: Attachment[] = [];
      for (const file of files) uploaded.push(await uploadFile(file, folder));
      onChange([...value, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">{label}</label>

      {value.length > 0 && (
        <ul className="space-y-2">
          {value.map((file, i) => {
            const Icon = isImage(file.type, file.url) ? ImageIcon : FileText;
            return (
              <li key={`${file.url}-${i}`} className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary border border-border">
                <Icon className="size-4 text-gold-deep shrink-0" />
                <input
                  value={file.name}
                  onChange={(e) => onChange(value.map((f, j) => (j === i ? { ...f, name: e.target.value } : f)))}
                  className="flex-1 min-w-0 bg-transparent text-sm font-medium focus:outline-none"
                  aria-label="File label"
                />
                <a href={file.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary hover:underline shrink-0">
                  View
                </a>
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, j) => j !== i))}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 shrink-0"
                  title="Remove file"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-dashed border-border text-sm font-semibold hover:bg-secondary disabled:opacity-60"
      >
        {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
        {uploading ? "Uploading…" : value.length ? "Add another file" : "Upload file (PDF or JPG)"}
      </button>

      <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
        <Paperclip className="size-3" /> PDF, JPG, PNG or WEBP — up to 10MB each.
      </p>
      <input ref={inputRef} type="file" accept={ACCEPT} multiple className="hidden" onChange={handleFiles} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
