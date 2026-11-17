"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileSignature, Printer, Trash2 } from "lucide-react";
import { formatSlipDate, type SlipSubmission } from "@/lib/permissionSlip";
import FilledSlip from "./FilledSlip";

type Props = {
  pin: string;
  initial: SlipSubmission[];
  notReady?: boolean;
};

export default function PermissionSlipsAdmin({ pin, initial, notReady }: Props) {
  const [slips, setSlips] = useState<SlipSubmission[]>(initial);
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function remove(slip: SlipSubmission) {
    if (
      !window.confirm(
        `Delete ${slip.data.childName}'s permission slip? This can't be undone.`,
      )
    ) {
      return;
    }
    setBusyId(slip.id);
    try {
      const res = await fetch("/api/admin/permission-slips", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, id: slip.id }),
      });
      if (res.ok) {
        setSlips((s) => s.filter((x) => x.id !== slip.id));
        if (openId === slip.id) setOpenId(null);
      }
    } finally {
      setBusyId(null);
    }
  }

  function printSlip(id: string) {
    setOpenId(id);
    // Let the expanded slip render before printing.
    setTimeout(() => window.print(), 150);
  }

  const open = slips.find((s) => s.id === openId) ?? null;

  return (
    <>
      <div className="rounded-[24px] bg-card px-6 py-6 shadow-[0_14px_32px_-16px_rgba(34,48,60,0.2)] ring-1 ring-navy/5 sm:px-8 print:hidden">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-mint text-navy">
            <FileSignature className="h-6 w-6" strokeWidth={1.9} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[20px] font-bold">Signed Permission Slips</h2>
            <p className="text-[13.5px] text-navy/70">
              Submitted online at /permission-form. Tap one to see the full slip.
            </p>
          </div>
          <span className="rounded-full bg-mint px-4 py-2 text-[13px] font-bold">
            {slips.length} on file
          </span>
        </div>

        {notReady ? (
          <p className="mt-5 rounded-[16px] bg-yellowpale/60 px-4 py-3.5 text-[14px]">
            Storage for slips isn&rsquo;t set up yet — run the <code>permission_slips</code>{" "}
            migration and this will start filling in.
          </p>
        ) : slips.length === 0 ? (
          <p className="mt-5 rounded-[16px] bg-ivory px-4 py-3.5 text-center text-[14px] text-navy/70">
            No slips yet — they&rsquo;ll show up here as parents sign.
          </p>
        ) : (
          <ul className="mt-5 divide-y divide-navy/10 overflow-hidden rounded-[16px] bg-ivory">
            {slips.map((slip) => {
              const isOpen = openId === slip.id;
              return (
                <li key={slip.id}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3.5 text-[14px]">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : slip.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 shrink-0 text-navy/60" strokeWidth={2.4} />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0 text-navy/60" strokeWidth={2.4} />
                      )}
                      <span className="min-w-0">
                        <span className="block truncate font-bold">{slip.data.childName}</span>
                        <span className="block truncate text-[13px] text-navy/65">
                          {slip.data.parentName}
                          {slip.data.parentPhone && <> &middot; {slip.data.parentPhone}</>}
                          {slip.data.gradeSchool && <> &middot; {slip.data.gradeSchool}</>}
                        </span>
                      </span>
                    </button>
                    <span className="text-[12.5px] text-navy/60">
                      signed {formatSlipDate(slip.data.date)}
                    </span>
                    <button
                      type="button"
                      onClick={() => printSlip(slip.id)}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-bold tracking-[0.06em] text-navy/80 hover:text-navy"
                    >
                      <Printer className="h-3.5 w-3.5" strokeWidth={2.4} /> PRINT
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(slip)}
                      disabled={busyId === slip.id}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-bold tracking-[0.06em] text-[#d1495b] hover:opacity-80 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={2.4} /> DELETE
                    </button>
                  </div>
                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 print:hidden">
                      <FilledSlip slip={slip} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Print target: only the open slip, full width, nothing else. */}
      {open && (
        <div className="hidden print:block">
          <FilledSlip slip={open} />
        </div>
      )}
    </>
  );
}
