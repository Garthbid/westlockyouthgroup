-- Allergies / health conditions field on the RSVP form.
alter table public.rsvps
  add column if not exists allergies text not null default '';
