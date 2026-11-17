import { NextResponse } from "next/server";
import {
  PERMISSION_FORM_KEY,
  PERMISSION_FORM_MAX_BYTES,
  getPermissionFormMeta,
  isMissingTable,
  withDb,
} from "@/lib/db";

function pinOk(pin: unknown) {
  return Boolean(process.env.ADMIN_PIN) && pin === process.env.ADMIN_PIN;
}

/** Admin: upload (replace) the permission form PDF. multipart fields: pin, file */
export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (!pinOk(form.get("pin"))) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { error: "Choose a PDF to upload." },
      { status: 400 },
    );
  }
  const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
  if (!isPdf) {
    return NextResponse.json(
      { error: "Only PDF files are accepted." },
      { status: 400 },
    );
  }
  if (file.size > PERMISSION_FORM_MAX_BYTES) {
    return NextResponse.json(
      { error: "That PDF is too big — please keep it under 4 MB." },
      { status: 413 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  // Check the magic bytes so a renamed file can't be served as a PDF.
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") {
    return NextResponse.json(
      { error: "That file doesn't look like a PDF." },
      { status: 400 },
    );
  }

  try {
    await withDb((client) =>
      client.query(
        `insert into public.site_files (key, filename, content_type, size, data, updated_at)
       values ($1, $2, 'application/pdf', $3, $4, now())
       on conflict (key) do update
         set filename = excluded.filename,
             content_type = excluded.content_type,
             size = excluded.size,
             data = excluded.data,
             updated_at = now()`,
        [PERMISSION_FORM_KEY, file.name.slice(0, 200), bytes.length, bytes],
      ),
    );
  } catch (err) {
    if (isMissingTable(err)) {
      return NextResponse.json(
        {
          error:
            "Storage isn't set up yet — run the site_files migration first.",
        },
        { status: 503 },
      );
    }
    throw err;
  }

  return NextResponse.json({ file: await getPermissionFormMeta() });
}

/** Admin: remove the current permission form. JSON body: { pin } */
export async function DELETE(request: Request) {
  const { pin } = await request.json().catch(() => ({ pin: undefined }));
  if (!pinOk(pin)) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  }
  await withDb((client) =>
    client.query(`delete from public.site_files where key = $1`, [
      PERMISSION_FORM_KEY,
    ]),
  );
  return NextResponse.json({ file: null });
}
