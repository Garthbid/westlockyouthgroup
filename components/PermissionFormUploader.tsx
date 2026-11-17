"use client";

import { useRef, useState } from "react";
import { ExternalLink, FileText, Trash2, Upload } from "lucide-react";
import type { SiteFileMeta } from "@/lib/db";

type Props = {
  pin: string;
  initial: SiteFileMeta | null;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PermissionFormUploader({ pin, initial }: Props) {
  const [file, setFile] = useState<SiteFileMeta | null>(initial);
  const [selected, setSelected] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload() {
    if (!selected) return;
    setBusy(true);
    setMessage(null);
    try {
      const body = new FormData();
      body.append("pin", pin);
      body.append("file", selected);
      const res = await fetch("/api/admin/permission-form", {
        method: "POST",
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ ok: false, text: data.error ?? "Upload failed." });
        return;
      }
      setFile(data.file);
      setSelected(null);
      if (inputRef.current) inputRef.current.value = "";
      setMessage({ ok: true, text: "Permission form updated — it's live on the site now." });
    } catch {
      setMessage({ ok: false, text: "Upload failed — check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!file) return;
    if (!window.confirm("Remove the PDF? The download link will show a \"check back soon\" note until you upload a new one.")) {
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/permission-form", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        setMessage({ ok: false, text: "Couldn't remove the form." });
        return;
      }
      setFile(null);
      setMessage({ ok: true, text: "Permission form removed." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-[24px] bg-card px-6 py-6 shadow-[0_14px_32px_-16px_rgba(34,48,60,0.2)] ring-1 ring-navy/5 sm:px-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-yellowpale text-navy">
          <FileText className="h-6 w-6" strokeWidth={1.9} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-[20px] font-bold">Paper Permission Form (PDF)</h2>
          <p className="text-[13.5px] text-navy/70">
            The &ldquo;download the PDF&rdquo; copy offered on the online form, for families who prefer paper.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[16px] bg-ivory px-4 py-3.5 text-[14px]">
        {file ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="min-w-0 flex-1 truncate">
              <span className="font-bold">{file.filename}</span>
              <span className="text-navy/60">
                &ensp;{formatSize(file.size)}&ensp;&middot;&ensp;updated {formatDate(file.updatedAt)}
              </span>
            </span>
            <a
              href="/permission-form/pdf"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-bold tracking-[0.06em] text-navy/80 hover:text-navy"
            >
              VIEW <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.4} />
            </a>
            <button
              type="button"
              onClick={remove}
              disabled={busy}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-bold tracking-[0.06em] text-[#d1495b] hover:opacity-80 disabled:opacity-50"
            >
              REMOVE <Trash2 className="h-3.5 w-3.5" strokeWidth={2.4} />
            </button>
          </div>
        ) : (
          <span className="text-navy/70">
            No PDF uploaded yet — the download link shows a &ldquo;check back soon&rdquo; note until you add one.
          </span>
        )}
      </div>

      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
        onSubmit={(e) => {
          e.preventDefault();
          void upload();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          aria-label="Choose permission form PDF"
          onChange={(e) => {
            setSelected(e.target.files?.[0] ?? null);
            setMessage(null);
          }}
          className="block w-full text-[13.5px] text-navy/80 file:mr-3 file:rounded-full file:border-0 file:bg-bluepale file:px-4 file:py-2 file:text-[12.5px] file:font-bold file:tracking-[0.06em] file:text-navy hover:file:bg-bluepale/80"
        />
        <button
          type="submit"
          disabled={busy || !selected}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-peach px-6 py-3 text-[13px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <Upload className="h-4 w-4" strokeWidth={2.4} />
          {busy ? "UPLOADING..." : file ? "REPLACE PDF" : "UPLOAD PDF"}
        </button>
      </form>
      <p className="mt-2 text-[12.5px] text-navy/55">PDF only, up to 4 MB. Uploading replaces the current form.</p>

      {message && (
        <p
          className={`mt-3 text-[13.5px] font-bold ${message.ok ? "text-[#2f8f5b]" : "text-[#d1495b]"}`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
