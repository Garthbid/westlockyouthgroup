import { createClient } from "@supabase/supabase-js";
import type { RsvpEntry } from "./events";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function saveRsvp(entry: RsvpEntry): Promise<boolean> {
  const { error } = await supabase.from("rsvps").insert({
    event_id: entry.eventId,
    name: entry.name,
    phone: entry.phone,
    parent_name: entry.parentName,
    parent_phone: entry.parentPhone,
  });
  if (error) {
    console.warn("Failed to save RSVP:", error.message);
    return false;
  }
  return true;
}

