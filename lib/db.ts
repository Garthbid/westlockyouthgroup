import { Client } from "pg";

/** Run a callback with a connected pg client over DATABASE_URL, always closing it. */
export async function withDb<T>(
  fn: (client: Client) => Promise<T>,
): Promise<T> {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}

export const PERMISSION_FORM_KEY = "permission-form";
/** Vercel serverless bodies are capped at ~4.5 MB; keep a little headroom. */
export const PERMISSION_FORM_MAX_BYTES = 4 * 1024 * 1024;

/** Postgres "undefined_table" — the migration hasn't been applied yet. */
export function isMissingTable(err: unknown) {
  return (err as { code?: string } | null)?.code === "42P01";
}

export type SiteFileMeta = {
  filename: string;
  size: number;
  updatedAt: string;
};

export async function getPermissionFormMeta(): Promise<SiteFileMeta | null> {
  try {
    return await withDb(async (client) => {
      const { rows } = await client.query(
        `select filename, size, updated_at from public.site_files where key = $1`,
        [PERMISSION_FORM_KEY],
      );
      if (rows.length === 0) return null;
      return {
        filename: rows[0].filename,
        size: rows[0].size,
        updatedAt: new Date(rows[0].updated_at).toISOString(),
      };
    });
  } catch (err) {
    // Don't take the admin page down just because the file table isn't there yet.
    if (isMissingTable(err)) return null;
    throw err;
  }
}
