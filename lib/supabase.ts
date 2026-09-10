import { createClient } from "@supabase/supabase-js";
import type { RsvpEntry } from "./events";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

type RsvpRow = {
  id: string;
  created_at: string;
  event_id: string;
  name: string;
  phone: string;
  parent_name: string;
  parent_phone: string;
};

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

export async function fetchRsvps(): Promise<RsvpEntry[] | null> {
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.warn("Failed to fetch RSVPs:", error.message);
    return null;
  }
  return (data as RsvpRow[]).map((row) => ({
    eventId: row.event_id,
    name: row.name,
    phone: row.phone,
    parentName: row.parent_name,
    parentPhone: row.parent_phone,
  }));
}
