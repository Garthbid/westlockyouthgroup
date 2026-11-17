-- RSVP form slimmed to child's name + parent's name + parent's email.
-- Phone/allergy columns stay (old rows keep their data; new rows write '').
alter table public.rsvps
  add column if not exists parent_email text not null default '';

-- Make PostgREST pick up the new column right away (the browser inserts via supabase-js).
notify pgrst, 'reload schema';
