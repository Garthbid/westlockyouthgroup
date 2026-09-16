import { NextResponse } from "next/server";
import { Client } from "pg";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type CancelEntry = {
  id?: string;
  eventId?: string;
  name?: string;
  phone?: string;
  parentName?: string;
  parentPhone?: string;
};

// Cancels RSVPs the visitor made from this browser. Rows are keyed by the
// uuid generated client-side at submit time; older entries (pre-id) fall
// back to an exact match on every field they typed.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const entries: CancelEntry[] = Array.isArray(body?.entries)
    ? body.entries.slice(0, 10)
    : [];
  if (entries.length === 0) {
    return NextResponse.json({ error: "Nothing to cancel" }, { status: 400 });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    let cancelled = 0;
    for (const entry of entries) {
      if (entry.id && UUID_RE.test(entry.id)) {
        const result = await client.query(
          "delete from public.rsvps where id = $1",
          [entry.id],
        );
        cancelled += result.rowCount ?? 0;
      } else if (entry.eventId && entry.name) {
        const result = await client.query(
          `delete from public.rsvps
            where event_id = $1 and name = $2 and phone = $3
              and parent_name = $4 and parent_phone = $5`,
          [
            entry.eventId,
            entry.name,
            entry.phone ?? "",
            entry.parentName ?? "",
            entry.parentPhone ?? "",
          ],
        );
        cancelled += result.rowCount ?? 0;
      }
    }
    return NextResponse.json({ cancelled });
  } finally {
    await client.end();
  }
}
