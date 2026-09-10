create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_id text not null,
  name text not null default '',
  phone text not null default '',
  parent_name text not null default '',
  parent_phone text not null default ''
);

alter table public.rsvps enable row level security;

create policy "anyone can rsvp"
  on public.rsvps for insert
  to anon, authenticated
  with check (true);

create policy "anyone can read rsvps"
  on public.rsvps for select
  to anon, authenticated
  using (true);
