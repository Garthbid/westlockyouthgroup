-- Small uploaded files managed from /admin (e.g. the permission form PDF).
-- Served by the app via DATABASE_URL; no public access through PostgREST.
create table if not exists public.site_files (
  key text primary key,
  filename text not null,
  content_type text not null,
  size integer not null,
  data bytea not null,
  updated_at timestamptz not null default now()
);

alter table public.site_files enable row level security;
-- No policies on purpose: anon/authenticated roles get nothing; the server
-- reads and writes as the postgres role over DATABASE_URL.
