"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Download, Printer } from "lucide-react";
import {
  EMPTY_SLIP,
  PARTICIPANT_FIELDS,
  RELEASE_PARAGRAPHS,
  SLIP_SUBTITLE,
  SLIP_TITLE,
  validateSlip,
  type SlipData,
  type SlipField,
  type SlipSubmission,
} from "@/lib/permissionSlip";
import FilledSlip from "./FilledSlip";
import SignaturePad from "./SignaturePad";
import { HeartDoodle, SmileyDoodle, SparkDoodle, UnderlineDoodle } from "./Doodles";

type Errors = ReturnType<typeof validateSlip>["errors"];

const inputClass =
  "w-full rounded-[14px] border bg-ivory/60 px-4 py-3 text-[15px] text-navy placeholder:text-navy/40 outline-none transition-all duration-200 focus:border-turquoise focus:ring-2 focus:ring-turquoise/30";

function todayIso() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function PermissionSlipForm() {
  const [data, setData] = useState<SlipData>({ ...EMPTY_SLIP, date: todayIso() });
  const [parentSignature, setParentSignature] = useState("");
  const [witnessSignature, setWitnessSignature] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState<SlipSubmission | null>(null);

  const set = (key: keyof SlipData, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function submit() {
    setServerError("");
    const check = validateSlip({ data, parentSignature, witnessSignature, consent });
    if (Object.keys(check.errors).length > 0) {
      setErrors(check.errors);
      const firstKey = Object.keys(check.errors)[0];
      document
        .getElementById(`field-${firstKey}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/permission-slips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          parentSignature,
          witnessSignature: witnessSignature || null,
          consent,
          website: "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        return;
      }
      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong — please try again.");
        return;
      }
      setDone({
        id: json.id,
        createdAt: json.createdAt ?? new Date().toISOString(),
        data: check.data,
        parentSignature,
        witnessSignature: witnessSignature || null,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError("Couldn't reach the server — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section className="mx-auto w-full max-w-[820px] px-6 pb-20 pt-10 lg:px-8">
        <div className="relative rounded-[28px] bg-card px-7 py-8 text-center shadow-[0_18px_40px_-18px_rgba(34,48,60,0.22)] sm:px-10 print:hidden">
          <div className="mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full bg-mint">
            <Check className="h-8 w-8 text-navy" strokeWidth={2.4} />
          </div>
          <h1 className="mt-4 font-hand text-[38px] font-bold">Got it — thank you!</h1>
          <p className="mx-auto mt-2 max-w-[520px] text-[15px] leading-[1.6] text-navy/75">
            {done.data.childName}&rsquo;s permission slip is signed and on file with the
            leaders. Keep or print a copy below if you&rsquo;d like one.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-peach px-7 py-3.5 text-[13.5px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Printer className="h-4 w-4" strokeWidth={2.4} /> PRINT A COPY
            </button>
            <Link
              href="/#events"
              className="inline-flex items-center gap-2 rounded-full bg-bluepale px-7 py-3.5 text-[13.5px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.4} /> BACK TO EVENTS
            </Link>
          </div>
          <SmileyDoodle className="absolute -right-3 -top-4 h-10 w-10 rotate-[10deg] text-turquoise sm:-right-5" />
          <HeartDoodle className="absolute -bottom-3 -left-2 h-8 w-8 rotate-[-12deg] text-peach sm:-left-4" />
        </div>
        <div className="mt-8 print:mt-0">
          <FilledSlip slip={done} />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[820px] px-6 pb-20 pt-8 lg:px-8">
      <Link
        href="/#events"
        className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.14em] text-navy/70 transition-colors duration-200 hover:text-navy"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} /> ALL EVENTS
      </Link>

      <div className="relative mt-5 w-fit">
        <h1 className="font-hand text-[38px] font-bold leading-tight sm:text-[46px]">
          Permission Form
        </h1>
        <SparkDoodle className="absolute -right-9 top-0 h-7 w-8 text-doodleorange" />
        <UnderlineDoodle className="mt-1 h-[7px] w-[200px] text-mint" />
      </div>
      <p className="mt-3 max-w-[600px] text-[15px] leading-[1.65] text-navy/75">
        One form covers every youth group event for the year. A parent or legal guardian
        fills this in and signs it right here — takes about five minutes. Prefer paper?{" "}
        <a
          href="/permission-form/pdf"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1 font-bold text-navy underline decoration-navy/30 underline-offset-[3px] hover:decoration-navy"
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2.4} /> download the PDF
        </a>{" "}
        and hand it to a leader.
      </p>

      <form
        className="mt-8 flex flex-col gap-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        {/* honeypot */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        {/* Release */}
        <Card>
          <p className="text-[12px] font-bold tracking-[0.22em] text-navy/60">STEP 1 OF 3</p>
          <h2 className="mt-1 text-[22px] font-bold">{SLIP_TITLE}</h2>
          <p className="text-[14px] font-bold text-navy/70">{SLIP_SUBTITLE}</p>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field id="date" label="Date" type="date" required value={data.date} error={errors.date} onChange={(v) => set("date", v)} />
            <Field id="childName" label="Child's name" required value={data.childName} error={errors.childName} onChange={(v) => set("childName", v)} placeholder="First and last name" />
          </div>

          <div className="mt-5 space-y-3 rounded-[16px] bg-ivory px-5 py-4 text-[14px] leading-[1.65] text-navy/85">
            {RELEASE_PARAGRAPHS.map((p) => {
              const [before, after] = p.split("{child}");
              return (
                <p key={p.slice(0, 20)}>
                  {before}
                  {after !== undefined && (
                    <>
                      <span className="rounded-md bg-yellowpale/70 px-1.5 font-bold text-navy">
                        {data.childName || "your child"}
                      </span>
                      {after}
                    </>
                  )}
                </p>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5">
            <Field id="parentName" label="Parent/guardian name(s)" required value={data.parentName} error={errors.parentName} onChange={(v) => set("parentName", v)} autoComplete="name" />
            <div id="field-parentSignature">
              <SignaturePad
                label="Parent/guardian signature"
                required
                error={errors.parentSignature}
                onChange={(v) => {
                  setParentSignature(v);
                  if (v && errors.parentSignature) setErrors((e) => ({ ...e, parentSignature: undefined }));
                }}
              />
            </div>
            <label
              id="field-consent"
              className={`flex cursor-pointer items-start gap-3 rounded-[14px] border px-4 py-3.5 text-[14px] leading-[1.5] ${
                errors.consent ? "border-[#d1495b]" : "border-navy/15"
              }`}
            >
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (e.target.checked) setErrors((er) => ({ ...er, consent: undefined }));
                }}
                className="mt-1 h-4 w-4 accent-[#22303c]"
              />
              <span>
                I am the parent or legal guardian named above. I have read the release and
                agree that my signature drawn here has the same effect as signing the paper
                form.
                {errors.consent && (
                  <span className="mt-1 block font-bold text-[#d1495b]">{errors.consent}</span>
                )}
              </span>
            </label>
          </div>
        </Card>

        {/* Witness */}
        <Card>
          <p className="text-[12px] font-bold tracking-[0.22em] text-navy/60">STEP 2 OF 3 · OPTIONAL</p>
          <h2 className="mt-1 text-[22px] font-bold">Signatures witnessed by</h2>
          <p className="mt-1 text-[14px] leading-[1.6] text-navy/70">
            If another adult is with you, they can witness the signature here. If not, skip this — a leader can witness it at the next event.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-5">
            <Field id="witnessName" label="Witness name, contact" value={data.witnessName} onChange={(v) => set("witnessName", v)} placeholder="Name and phone or email" />
            <SignaturePad label="Witness signature" onChange={setWitnessSignature} />
          </div>
        </Card>

        {/* Participant info */}
        <Card>
          <p className="text-[12px] font-bold tracking-[0.22em] text-navy/60">STEP 3 OF 3</p>
          <h2 className="mt-1 text-[22px] font-bold">Personal information about youth group participant</h2>
          <p className="mt-1 text-[14px] leading-[1.6] text-navy/70">
            Only the leaders see this. It&rsquo;s what we&rsquo;d need in an emergency.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {PARTICIPANT_FIELDS.filter((f) => f.id !== "childName").map((f) => (
              <div key={f.id} className={f.type === "textarea" || f.id === "address" ? "sm:col-span-2" : ""}>
                <Field
                  id={f.id}
                  label={f.label}
                  type={f.type}
                  required={f.required}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  value={data[f.id]}
                  error={errors[f.id]}
                  onChange={(v) => set(f.id, v)}
                />
              </div>
            ))}
          </div>
        </Card>

        {serverError && (
          <p className="rounded-[14px] bg-pinkpale/60 px-4 py-3 text-[14px] font-bold text-[#a4243b]">
            {serverError}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-peach px-8 py-4 text-[14px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {submitting ? "SENDING..." : "SIGN & SUBMIT"}{" "}
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </button>
          <p className="mt-4 flex items-center justify-center gap-2 text-center font-script text-[20px] font-semibold text-navy/80">
            thanks for trusting us with your kid
            <HeartDoodle className="h-4 w-4" strokeWidth={3.2} />
          </p>
        </div>
      </form>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] bg-card px-6 py-6 shadow-[0_14px_32px_-16px_rgba(34,48,60,0.2)] ring-1 ring-navy/5 sm:px-8 sm:py-7">
      {children}
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  placeholder,
  autoComplete,
  value,
  error,
  onChange,
}: Pick<SlipField, "label" | "type" | "required" | "placeholder" | "autoComplete"> & {
  id: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  const border = error ? "border-[#d1495b]" : "border-navy/15";
  return (
    <div id={`field-${id}`}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-bold tracking-[0.02em]">
        {label}
        {required && <span className="text-[#d1495b]"> *</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={2}
          value={value}
          placeholder={placeholder ?? "None"}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} ${border} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} ${border}`}
        />
      )}
      {error && <p className="mt-1.5 text-[13px] font-bold text-[#d1495b]">{error}</p>}
    </div>
  );
}
