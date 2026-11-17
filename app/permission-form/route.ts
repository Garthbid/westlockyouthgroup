import { NextResponse } from "next/server";
import { PERMISSION_FORM_KEY, isMissingTable, withDb } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Public: streams the current permission form PDF (uploaded from /admin). */
export async function GET() {
  const row = await withDb(async (client) => {
    const { rows } = await client.query(
      `select filename, content_type, data, updated_at
         from public.site_files where key = $1`,
      [PERMISSION_FORM_KEY],
    );
    return rows[0] ?? null;
  }).catch((err) => {
    if (isMissingTable(err)) return null;
    throw err;
  });

  if (!row) {
    return new NextResponse(
      "The permission form hasn't been uploaded yet. Please check back soon or call Hailee at 780-283-0251.",
      { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const safeName = String(row.filename).replace(/[^\w.() -]+/g, "_");
  return new NextResponse(new Uint8Array(row.data as Buffer), {
    status: 200,
    headers: {
      "Content-Type": row.content_type,
      "Content-Disposition": `inline; filename="${safeName}"`,
      "Cache-Control": "no-store",
      "Last-Modified": new Date(row.updated_at).toUTCString(),
    },
  });
}
