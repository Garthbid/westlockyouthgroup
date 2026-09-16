"use client";

import { useState } from "react";
import { removeRsvp } from "@/lib/events";
import { cancelRsvps } from "@/lib/supabase";

export default function CancelRsvpButton({
  eventId,
  onCancelled,
}: {
  eventId: string;
  onCancelled: () => void;
}) {
  const [busy, setBusy] = useState(false);

  const handleCancel = async () => {
    if (
      !window.confirm(
        "Cancel your RSVP for this event? You can always RSVP again if you change your mind.",
      )
    ) {
      return;
    }
    setBusy(true);
    const removed = removeRsvp(eventId);
    if (removed.length > 0) {
      await cancelRsvps(removed);
    }
    setBusy(false);
    onCancelled();
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={busy}
      className="text-[12px] font-bold tracking-[0.04em] text-navy/55 underline underline-offset-2 transition-colors duration-200 hover:text-navy disabled:opacity-50"
    >
      {busy ? "Cancelling..." : "Can't make it? Cancel RSVP"}
    </button>
  );
}
