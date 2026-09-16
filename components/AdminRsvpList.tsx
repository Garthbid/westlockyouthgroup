"use client";

import { useCallback, useEffect, useState } from "react";
import { Lock, Phone, Users } from "lucide-react";
import { EVENTS, type RsvpEntry } from "@/lib/events";
import { HeartDoodle, SparkDoodle, UnderlineDoodle } from "./Doodles";

const PIN_SESSION_KEY = "wyg-admin-pin";

export default function AdminRsvpList() {
  const [pinInput, setPinInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<RsvpEntry[]>([]);

  const unlock = useCallback(async (pin: string) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/admin/rsvps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        setError(true);
        sessionStorage.removeItem(PIN_SESSION_KEY);
        return;
      }
      const data = await res.json();
      setEntries(data.rsvps ?? []);
      setUnlocked(true);
      sessionStorage.setItem(PIN_SESSION_KEY, pin);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(PIN_SESSION_KEY);
    if (saved) void unlock(saved);
  }, [unlock]);

  if (!unlocked) {
    return (
      <section className="mx-auto w-full max-w-[420px] px-6 pb-24 pt-16 text-center">
        <div className="mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full bg-bluepale">
          <Lock className="h-8 w-8 text-navy" strokeWidth={1.9} />
        </div>
        <div className="relative mt-5 inline-block">
          <h1 className="font-hand text-[38px] font-bold">Leaders Only</h1>
          <SparkDoodle className="absolute -right-9 top-0 h-7 w-8 text-doodleorange" />
        </div>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-navy/70">
          Enter the admin PIN to see the RSVP lists.
        </p>
        <form
          className="mt-7"
          onSubmit={(e) => {
            e.preventDefault();
            void unlock(pinInput);
          }}
        >
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={8}
            value={pinInput}
            onChange={(e) => {
              setPinInput(e.target.value);
              setError(false);
            }}
            placeholder="• • • •"
            aria-label="Admin PIN"
            className="w-full rounded-[16px] border border-navy/15 bg-card px-4 py-4 text-center text-[24px] font-bold tracking-[0.5em] text-navy placeholder:text-navy/30 outline-none transition-all duration-200 focus:border-turquoise focus:ring-2 focus:ring-turquoise/30"
          />
          {error && (
            <p className="mt-3 text-[13.5px] font-bold text-[#d1495b]">
              Hmm, that&rsquo;s not it — try again.
            </p>
          )}
          <button
            type="submit"
            disabled={loading || pinInput.length === 0}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-peach px-8 py-4 text-[14px] font-bold tracking-[0.08em] text-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {loading ? "CHECKING..." : "UNLOCK"}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1080px] px-6 pb-20 pt-10 lg:px-8">
      <p className="text-[12px] font-bold tracking-[0.22em] text-navy/60">
        ADMIN
      </p>
      <div className="relative mt-1 inline-block">
        <h1 className="font-hand text-[38px] font-bold sm:text-[44px]">
          RSVP List
        </h1>
        <SparkDoodle className="absolute -right-9 top-0 h-7 w-8 text-doodleorange" />
        <UnderlineDoodle className="mt-1 h-[7px] w-[160px] text-mint" />
      </div>
      <p className="mt-3 max-w-[520px] text-[14px] leading-[1.6] text-navy/70">
        Everyone who&rsquo;s said they&rsquo;re coming, grouped by event.
      </p>

      <div className="mt-9 flex flex-col gap-8">
        {EVENTS.map((event) => {
          const eventEntries = entries.filter((r) => r.eventId === event.id);
          return (
            <div
              key={event.id}
              className="rounded-[24px] bg-card px-6 py-6 shadow-[0_14px_32px_-16px_rgba(34,48,60,0.2)] ring-1 ring-navy/5 sm:px-8"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div
                  className={`flex h-[52px] w-[52px] flex-col items-center justify-center rounded-[12px] ${event.badgeBg} text-navy`}
                >
                  <span className="text-[10px] font-bold tracking-[0.06em]">
                    {event.month}
                  </span>
                  <span className="-mt-0.5 text-[18px] font-bold">
                    {event.day}
                  </span>
                </div>
                <div className="mr-auto">
                  <h2 className="text-[20px] font-bold">{event.title}</h2>
                  <p className="text-[13px] text-navy/70">
                    {event.dateLabel}&ensp;|&ensp;{event.time}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-4 py-1.5 text-[12.5px] font-bold text-navy">
                  <Users className="h-3.5 w-3.5" strokeWidth={2.4} />
                  {eventEntries.length} going
                </span>
              </div>

              {eventEntries.length === 0 ? (
                <p className="mt-5 rounded-[14px] bg-ivory px-4 py-4 text-center text-[14px] text-navy/60">
                  No RSVPs yet — they&rsquo;ll show up here.
                </p>
              ) : (
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left">
                    <thead>
                      <tr className="text-[11.5px] font-bold tracking-[0.14em] text-navy/55">
                        <th className="pb-2.5 pr-4 font-bold">NAME</th>
                        <th className="pb-2.5 pr-4 font-bold">PHONE</th>
                        <th className="pb-2.5 pr-4 font-bold">PARENT</th>
                        <th className="pb-2.5 pr-4 font-bold">
                          PARENT&rsquo;S PHONE
                        </th>
                        <th className="pb-2.5 font-bold">
                          ALLERGIES / HEALTH
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventEntries.map((entry, i) => (
                        <tr
                          key={`${entry.eventId}-${entry.name}-${i}`}
                          className="border-t border-navy/10 text-[14.5px] text-navy"
                        >
                          <td className="py-3 pr-4 font-bold">
                            {entry.name || "—"}
                          </td>
                          <td className="py-3 pr-4">
                            <span className="inline-flex items-center gap-1.5">
                              <Phone className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
                              {entry.phone || "—"}
                            </span>
                          </td>
                          <td className="py-3 pr-4">{entry.parentName || "—"}</td>
                          <td className="py-3 pr-4">{entry.parentPhone || "—"}</td>
                          <td className="py-3">{entry.allergies || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-8 flex items-center gap-2 font-script text-[19px] font-semibold text-navy/70">
        good work, leader <HeartDoodle className="h-4 w-4" strokeWidth={3.2} />
      </p>
    </section>
  );
}
