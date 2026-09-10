"use client";

import { useEffect, useState } from "react";
import { Phone, Users } from "lucide-react";
import { EVENTS, getRsvpEntries, type RsvpEntry } from "@/lib/events";
import { SparkDoodle, UnderlineDoodle } from "./Doodles";

// Placeholder rows so the list has shape before a real backend exists.
const DEMO_ENTRIES: RsvpEntry[] = [
  { eventId: "bowling", name: "Emma Sawatzky", phone: "(780) 555-2214", parentName: "Karen Sawatzky", parentPhone: "(780) 555-2215" },
  { eventId: "bowling", name: "Liam Peters", phone: "(780) 555-8830", parentName: "Dave Peters", parentPhone: "(780) 555-8831" },
  { eventId: "bowling", name: "Noah Friesen", phone: "(780) 555-4102", parentName: "Angela Friesen", parentPhone: "(780) 555-4103" },
  { eventId: "fire-faith", name: "Olivia Dyck", phone: "(780) 555-9917", parentName: "Mark Dyck", parentPhone: "(780) 555-9918" },
  { eventId: "fire-faith", name: "Ava Reimer", phone: "(780) 555-3345", parentName: "Shelly Reimer", parentPhone: "(780) 555-3346" },
  { eventId: "ice-cream", name: "Jack Wiebe", phone: "(780) 555-7160", parentName: "Tanya Wiebe", parentPhone: "(780) 555-7161" },
];

export default function AdminRsvpList() {
  const [localEntries, setLocalEntries] = useState<RsvpEntry[]>([]);

  useEffect(() => {
    setLocalEntries(getRsvpEntries());
  }, []);

  const allEntries = [...DEMO_ENTRIES, ...localEntries];

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
        Prototype note: submissions are only saved on the device they were
        made on — the greyed rows are demo data.
      </p>

      <div className="mt-9 flex flex-col gap-8">
        {EVENTS.map((event) => {
          const entries = allEntries.filter((r) => r.eventId === event.id);
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
                  {entries.length} going
                </span>
              </div>

              {entries.length === 0 ? (
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
                        <th className="pb-2.5 font-bold">PARENT&rsquo;S PHONE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry, i) => {
                        const isDemo = DEMO_ENTRIES.includes(entry);
                        return (
                          <tr
                            key={`${entry.eventId}-${entry.name}-${i}`}
                            className={`border-t border-navy/10 text-[14.5px] ${
                              isDemo ? "text-navy/50" : "text-navy"
                            }`}
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
                            <td className="py-3">{entry.parentPhone || "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
