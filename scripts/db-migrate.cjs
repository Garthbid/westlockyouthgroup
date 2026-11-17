#!/usr/bin/env node
// Apply one SQL migration file to the database in .env.local (DATABASE_URL).
// Usage: node scripts/db-migrate.cjs supabase/migrations/<file>.sql
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/db-migrate.cjs <migration.sql>");
  process.exit(1);
}
const envPath = path.join(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
    }),
);
if (!env.DATABASE_URL) {
  console.error("DATABASE_URL missing from .env.local");
  process.exit(1);
}
const sql = fs.readFileSync(file, "utf8");
const client = new Client({ connectionString: env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
(async () => {
  await client.connect();
  try {
    await client.query(sql);
    console.log(`Applied ${path.basename(file)}`);
  } finally {
    await client.end();
  }
})().catch((e) => {
  console.error("Migration failed:", e.message);
  process.exit(1);
});
