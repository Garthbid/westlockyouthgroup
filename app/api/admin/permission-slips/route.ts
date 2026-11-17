import { NextResponse } from "next/server";
import { isMissingTable, withDb } from "@/lib/db";
import type { SlipSubmission } from "@/lib/permissionSlip";

function pinOk(pin: unknown) {
  return Boolean(process.env.ADMIN_PIN) && pin === process.env.ADMIN_PIN;
}

/** Admin: list all submitted slips, newest first. JSON: { pin } */
export async function POST(request: Request) {
  const { pin } = await request.json().catch(() => ({ pin: undefined }));
  if (!pinOk(pin)) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  }
  try {
    const slips = await withDb(async (client) => {
      const { rows } = await client.query(
        `select id, created_at, data, parent_signature, witness_signature
           from public.permission_slips
          order by created_at desc`,
      );
      return rows.map(
        (r): SlipSubmission => ({
          id: r.id,
          createdAt: new Date(r.created_at).toISOString(),
          data: r.data,
          parentSignature: r.parent_signature,
          witnessSignature: r.witness_signature,
        }),
      );
    });
    return NextResponse.json({ slips });
  } catch (err) {
    if (isMissingTable(err)) return NextResponse.json({ slips: [], notReady: true });
    throw err;
  }
}

/** Admin: delete one slip. JSON: { pin, id } */
export async function DELETE(request: Request) {
  const { pin, id } = await request.json().catch(() => ({}));
  if (!pinOk(pin)) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  }
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Bad id" }, { status: 400 });
  }
  await withDb((client) =>
    client.query(`delete from public.permission_slips where id = $1`, [id]),
  );
  return NextResponse.json({ ok: true });
}
