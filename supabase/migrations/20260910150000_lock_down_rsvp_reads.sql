-- RSVP list contains minors' contact info: reads go through the
-- server-side admin API only. Public keeps insert (the RSVP form).
drop policy if exists "anyone can read rsvps" on public.rsvps;
