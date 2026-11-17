/* eslint-disable @next/next/no-img-element */
import {
  PARTICIPANT_FIELDS,
  RELEASE_PARAGRAPHS,
  SLIP_SUBTITLE,
  SLIP_TITLE,
  formatSlipDate,
  type SlipSubmission,
} from "@/lib/permissionSlip";

/**
 * A completed permission slip, laid out like the paper original.
 * Used on the thank-you screen (print a copy) and in /admin.
 * Server-safe: no hooks, plain markup, prints cleanly.
 */
export default function FilledSlip({ slip }: { slip: SlipSubmission }) {
  const { data } = slip;
  const childName = data.childName || "____________";
  const submitted = new Date(slip.createdAt);

  return (
    <article className="rounded-[20px] bg-white px-6 py-7 text-[13.5px] leading-[1.55] text-[#1d1d1d] ring-1 ring-navy/10 sm:px-9 sm:py-9 print:rounded-none print:px-0 print:py-0 print:ring-0">
      <p className="text-right text-[13px]">
        <span className="font-bold underline">DATE:</span>{" "}
        <span className="border-b border-[#1d1d1d] px-2 font-semibold">
          {formatSlipDate(data.date)}
        </span>
      </p>
      <h2 className="mt-3 text-center text-[15px] font-bold underline">
        {SLIP_TITLE}
      </h2>
      <p className="text-center text-[13.5px] font-bold">{SLIP_SUBTITLE}</p>

      <div className="mt-4 space-y-3">
        {RELEASE_PARAGRAPHS.map((p) => {
          const [before, after] = p.split("{child}");
          return (
            <p key={p.slice(0, 20)} className="indent-8 text-justify">
              {before}
              {after !== undefined && (
                <>
                  <span className="border-b border-[#1d1d1d] px-2 font-semibold">
                    {childName}
                  </span>
                  {after}
                </>
              )}
            </p>
          );
        })}
      </div>

      <dl className="mt-6 space-y-3">
        <Row label="Parent/guardian name(s)" value={data.parentName} />
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
          <dt className="shrink-0">Signature</dt>
          <dd className="min-w-[240px] flex-1 border-b border-[#1d1d1d]">
            <img
              src={slip.parentSignature}
              alt={`Signature of ${data.parentName}`}
              className="h-[64px] w-auto max-w-full"
            />
          </dd>
        </div>
        <p className="pt-1">Signatures witnessed by:</p>
        <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
          <Row label="Witness name, contact" value={data.witnessName || "—"} />
          <div className="flex flex-wrap items-end gap-x-3">
            <dt className="shrink-0">Witness signature</dt>
            <dd className="min-w-[200px] border-b border-[#1d1d1d]">
              {slip.witnessSignature ? (
                <img
                  src={slip.witnessSignature}
                  alt="Witness signature"
                  className="h-[56px] w-auto max-w-full"
                />
              ) : (
                <span className="px-2 text-[#1d1d1d]/60">—</span>
              )}
            </dd>
          </div>
        </div>
      </dl>

      <h3 className="mt-7 text-[14px] font-bold">
        Personal information about youth group participant:
      </h3>
      <dl className="mt-2 space-y-1.5">
        {PARTICIPANT_FIELDS.map((f) => (
          <Row
            key={f.id}
            label={f.label}
            value={
              f.type === "date" && data[f.id]
                ? formatSlipDate(data[f.id])
                : data[f.id] || "—"
            }
            indent={
              f.id === "emergencyRelationship" || f.id === "emergencyPhone"
            }
          />
        ))}
      </dl>

      <p className="mt-8 text-[11.5px] text-[#1d1d1d]/60">
        Signed electronically on westlockyouthgroup.com on{" "}
        {submitted.toLocaleString("en-CA", {
          dateStyle: "long",
          timeStyle: "short",
          timeZone: "America/Edmonton",
        })}{" "}
        · ref {slip.id.slice(0, 8)}
      </p>
    </article>
  );
}

function Row({
  label,
  value,
  indent,
}: {
  label: string;
  value: string;
  indent?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-baseline gap-x-3 ${indent ? "pl-12" : ""}`}>
      <dt className="shrink-0">{label}</dt>
      <dd className="min-w-[200px] flex-1 whitespace-pre-wrap border-b border-[#1d1d1d] px-2 font-semibold">
        {value}
      </dd>
    </div>
  );
}
