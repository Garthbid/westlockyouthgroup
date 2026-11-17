/**
 * Shared definition of the General Permission Slip & Liability Release form.
 * Mirrors the paper slip from Westlock Gospel Chapel Youth Group, field for field.
 * Safe to import from client components (no server-only code here).
 */

export const SLIP_TITLE = "Westlock Gospel Chapel Youth Group";
export const SLIP_SUBTITLE = "General Permission Slip and Liability Release Form";

/** Release paragraphs. `{child}` is replaced with the child's name. */
export const RELEASE_PARAGRAPHS = [
  "I (We), the undersigned, Parents/legal Guardians of {child} (child's name), do hereby release the leaders of the Westlock Gospel Chapel (WGC), as well as members of the church, from any and all claims or liability for personal injury, sickness, death, property damage or expenses associated with the child's participation in the activities of the WGC youth group. Furthermore, I agree to take responsibility for any cost or liability incurred or sustained by the WGC as a result of negligent, willful or intentional acts of the child.",
  "I also hereby give permission for the leaders of the WGC to authorize any and all needed emergency medical treatment, and will be responsible for all costs associated with said medical treatment (understanding that all efforts will be made by the leaders to communicate with me, for consultation, should said medical treatment need to be made.) The authorization for medical treatment includes, but is not limited to, any examination, radiography, anesthetic, medical or surgical diagnosis or hospital care, rendered under supervision of any licensed medical practitioner either in or out of a hospital.",
  "I do hereby request that the above named child be permitted to attend the WGC youth group activities, both onsite and offsite.",
];

export type SlipFieldType = "text" | "tel" | "email" | "date" | "textarea";

export type SlipField = {
  id: keyof SlipData;
  label: string;
  type?: SlipFieldType;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

/** Everything a submission stores (signatures live alongside, not in here). */
export type SlipData = {
  date: string;
  childName: string;
  parentName: string;
  witnessName: string;
  sex: string;
  birthdate: string;
  address: string;
  cityProvince: string;
  postalCode: string;
  parentPhone: string;
  parentEmail: string;
  participantPhone: string;
  participantEmail: string;
  gradeSchool: string;
  physician: string;
  physicianPhone: string;
  healthCareNumber: string;
  medications: string;
  disabilities: string;
  allergies: string;
  emergencyContact: string;
  emergencyRelationship: string;
  emergencyPhone: string;
};

export const EMPTY_SLIP: SlipData = {
  date: "",
  childName: "",
  parentName: "",
  witnessName: "",
  sex: "",
  birthdate: "",
  address: "",
  cityProvince: "",
  postalCode: "",
  parentPhone: "",
  parentEmail: "",
  participantPhone: "",
  participantEmail: "",
  gradeSchool: "",
  physician: "",
  physicianPhone: "",
  healthCareNumber: "",
  medications: "",
  disabilities: "",
  allergies: "",
  emergencyContact: "",
  emergencyRelationship: "",
  emergencyPhone: "",
};

/** "Personal information about youth group participant" — in paper order. */
export const PARTICIPANT_FIELDS: SlipField[] = [
  { id: "childName", label: "Child's name", required: true, autoComplete: "off" },
  { id: "sex", label: "Sex" },
  { id: "birthdate", label: "Birthdate", type: "date", required: true },
  { id: "address", label: "Address", autoComplete: "street-address" },
  { id: "cityProvince", label: "City / Province", placeholder: "Westlock, AB" },
  { id: "postalCode", label: "Postal code", autoComplete: "postal-code" },
  { id: "parentPhone", label: "Parent cell phone", type: "tel", required: true },
  { id: "parentEmail", label: "Parent email", type: "email" },
  { id: "participantPhone", label: "Participant cell phone", type: "tel" },
  { id: "participantEmail", label: "Participant email", type: "email" },
  { id: "gradeSchool", label: "Grade / School" },
  { id: "physician", label: "Family physician" },
  { id: "physicianPhone", label: "Physician phone & emergency phone", type: "tel" },
  { id: "healthCareNumber", label: "Alberta Health Care #" },
  { id: "medications", label: "Long-term medications", type: "textarea" },
  { id: "disabilities", label: "Physical / mental disabilities", type: "textarea" },
  { id: "allergies", label: "Allergies", type: "textarea" },
  { id: "emergencyContact", label: "In case of emergency, contact", required: true },
  { id: "emergencyRelationship", label: "Relationship to participant", required: true },
  { id: "emergencyPhone", label: "Phone", type: "tel", required: true },
];

export const REQUIRED_FIELDS: (keyof SlipData)[] = [
  "date",
  "childName",
  "parentName",
  ...PARTICIPANT_FIELDS.filter((f) => f.required).map((f) => f.id),
];

/** Max length for any single text answer. */
export const MAX_FIELD_LENGTH = 500;
/** Signature PNG data URL cap (a normal signature is 5–30 KB). */
export const MAX_SIGNATURE_LENGTH = 200_000;

export type SlipSubmission = {
  id: string;
  createdAt: string;
  data: SlipData;
  parentSignature: string;
  witnessSignature: string | null;
};

/** Normalize + validate a submission body. Returns errors keyed by field. */
export function validateSlip(input: unknown): {
  data: SlipData;
  parentSignature: string;
  witnessSignature: string | null;
  errors: Partial<Record<keyof SlipData | "parentSignature" | "consent", string>>;
} {
  const body = (input ?? {}) as Record<string, unknown>;
  const raw = (body.data ?? {}) as Record<string, unknown>;
  const data: SlipData = { ...EMPTY_SLIP };
  for (const key of Object.keys(EMPTY_SLIP) as (keyof SlipData)[]) {
    const v = raw[key];
    data[key] = typeof v === "string" ? v.trim().slice(0, MAX_FIELD_LENGTH) : "";
  }

  const errors: ReturnType<typeof validateSlip>["errors"] = {};
  for (const key of REQUIRED_FIELDS) {
    if (!data[key]) errors[key] = "Required";
  }
  if (data.parentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.parentEmail)) {
    errors.parentEmail = "That email doesn't look right";
  }
  if (
    data.participantEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.participantEmail)
  ) {
    errors.participantEmail = "That email doesn't look right";
  }

  const sigOk = (s: unknown): s is string =>
    typeof s === "string" &&
    s.startsWith("data:image/png;base64,") &&
    s.length > 200 &&
    s.length <= MAX_SIGNATURE_LENGTH;

  const parentSignature = sigOk(body.parentSignature) ? body.parentSignature : "";
  if (!parentSignature) errors.parentSignature = "Please sign in the box";
  const witnessSignature = sigOk(body.witnessSignature) ? body.witnessSignature : null;

  if (body.consent !== true) {
    errors.consent = "Please confirm you agree to the release";
  }

  return { data, parentSignature, witnessSignature, errors };
}

export function formatSlipDate(iso: string) {
  // iso is yyyy-mm-dd from a date input; render without timezone shifts.
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
