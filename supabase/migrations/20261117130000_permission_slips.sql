-- Signed permission slips submitted from /permission-form.
-- Written and read only by the app over DATABASE_URL (no PostgREST access).
create table if not exists public.permission_slips (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  child_name text not null,
  parent_name text not null,
  parent_phone text not null default '',
  parent_email text not null default '',
  data jsonb not null,
  parent_signature text not null,
  witness_signature text
);

create index if not exists permission_slips_created_at_idx
  on public.permission_slips (created_at desc);

alter table public.permission_slips enable row level security;
-- No policies on purpose: anon/authenticated roles get nothing.
