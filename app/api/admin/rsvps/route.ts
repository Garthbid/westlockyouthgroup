import { NextResponse } from "next/server";
import { Client } from "pg";
import { getPermissionFormMeta } from "@/lib/db";

export async function POST(request: Request) {
  const { pin } = await request.json().catch(() => ({ pin: undefined }));

  if (!process.env.ADMIN_PIN || pin !== process.env.ADMIN_PIN) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const { rows } = await client.query(
      `select event_id, name, phone, parent_name, parent_phone, parent_email, allergies
         from public.rsvps
        order by created_at asc`,
    );
    return NextResponse.json({
      permissionForm: await getPermissionFormMeta(),
      rsvps: rows.map((row) => ({
        eventId: row.event_id,
        name: row.name,
        phone: row.phone,
        parentName: row.parent_name,
        parentPhone: row.parent_phone,
        parentEmail: row.parent_email ?? "",
        allergies: row.allergies,
      })),
    });
  } finally {
    await client.end();
  }
}
