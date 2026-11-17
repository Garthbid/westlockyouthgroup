import { NextResponse } from "next/server";
import { isMissingTable, withDb } from "@/lib/db";
import { validateSlip } from "@/lib/permissionSlip";

/** Public: submit a signed permission slip. JSON: { data, parentSignature, witnessSignature?, consent, website? } */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  // Honeypot: real visitors never fill this.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true, id: "ok" });
  }

  const { data, parentSignature, witnessSignature, errors } = validateSlip(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  try {
    const row = await withDb(async (client) => {
      const { rows } = await client.query(
        `insert into public.permission_slips
           (child_name, parent_name, parent_phone, parent_email, data, parent_signature, witness_signature)
         values ($1, $2, $3, $4, $5, $6, $7)
         returning id, created_at`,
        [
          data.childName,
          data.parentName,
          data.parentPhone,
          data.parentEmail,
          JSON.stringify(data),
          parentSignature,
          witnessSignature,
        ],
      );
      return rows[0];
    });
    return NextResponse.json({
      ok: true,
      id: row.id,
      createdAt: new Date(row.created_at).toISOString(),
    });
  } catch (err) {
    if (isMissingTable(err)) {
      return NextResponse.json(
        { error: "The form isn't quite ready yet — please try again later or call Hailee at 780-283-0251." },
        { status: 503 },
      );
    }
    throw err;
  }
}
