export type EventItem = {
  id: string;
  image: string;
  alt: string;
  month: string;
  day: string;
  badgeBg: string;
  title: string;
  time: string;
  location: string;
  dateLabel: string;
  tagline: string;
  description: string[];
  plan: { time: string; item: string }[];
  bring: string[];
  cost: string;
  parentNote: string;
};

export const EVENTS: EventItem[] = [
  {
    id: "street-hockey",
    image: "/images/streethockey.jpg",
    alt: "Crossed hockey sticks, a puck, a hot dog and a mug of hot chocolate in the snow",
    month: "NOV",
    day: "20",
    badgeBg: "bg-bluepale",
    title: "Street Hockey Night",
    time: "7:00 – 9:00 PM",
    location: "Westlock Gospel Chapel",
    dateLabel: "Friday, November 20",
    tagline: "hot dogs, hot chocolate & slapshots",
    description: [
      "Grab a stick and hit the pavement! We're playing street hockey outside Westlock Gospel Chapel during Westlock's Light Up Night, with the whole town lit up around us. Never played? Perfect — nobody's keeping score (okay, somebody's keeping score).",
      "Hot dogs and hot chocolate are on us, so come hungry and dress warm. Bring a friend — the more players, the better the game.",
    ],
    plan: [
      { time: "7:00", item: "Meet at Westlock Gospel Chapel — teams get picked" },
      { time: "7:15", item: "Puck drops — games start" },
      { time: "8:15", item: "Hot dogs & hot chocolate break" },
      { time: "8:30", item: "Devotional — a short talk & time to think" },
      { time: "8:45", item: "Back out for the last games" },
      { time: "9:00", item: "Parent pickup at the church" },
    ],
    bring: [
      "Warm layers, toque & gloves (it's outside!)",
      "A stick if you have one — we have extras",
      "A friend — everyone's welcome",
    ],
    cost: "Free — hot dogs & hot chocolate on us",
    parentNote:
      "Drop-off and pickup both happen at Westlock Gospel Chapel. We're outside the whole time, so please send kids dressed for the weather. Wraps up at 9:00.",
  },
  {
    id: "games-night",
    image: "/images/gamesnight.jpg",
    alt: "Basketball, volleyball, dodgeball and a badminton birdie over a gym net",
    month: "DEC",
    day: "4",
    badgeBg: "bg-mint",
    title: "Games Night",
    time: "7:00 – 9:00 PM",
    location: "Westlock Rotary Spirit Centre (Field House)",
    dateLabel: "Friday, December 4",
    tagline: "dodgeball, badminton, basketball & more",
    description: [
      "We've got the whole field house for the night. Dodgeball, badminton, basketball, volleyball and whatever else we can set up — jump into whichever game you want and switch whenever you feel like it.",
      "Snacks and drinks are covered. Just show up in gym clothes and ready to play — no skill required, just energy.",
    ],
    plan: [
      { time: "7:00", item: "Doors open at the Rotary Spirit Centre field house" },
      { time: "7:15", item: "Dodgeball to kick things off" },
      { time: "7:45", item: "Open courts — badminton, basketball, volleyball & more" },
      { time: "8:30", item: "Devotional — a short talk & time to think" },
      { time: "8:45", item: "Snacks & last games" },
      { time: "9:00", item: "Parent pickup" },
    ],
    bring: [
      "Clean indoor runners (gym floor!)",
      "A water bottle",
      "A friend or two",
    ],
    cost: "Free — snacks & drinks on us",
    parentNote:
      "Drop-off and pickup both happen at the Westlock Rotary Spirit Centre (Field House), not the church. Snacks are provided — allergies go on the permission form so leaders have them on hand.",
  },
];

export const RSVP_STORAGE_KEY = "wyg-rsvps";
export const RSVP_ENTRIES_KEY = "wyg-rsvp-entries";

export type RsvpEntry = {
  id?: string;
  eventId: string;
  name: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  allergies?: string;
};

export function getRsvps(): string[] {
  try {
    const raw = window.localStorage.getItem(RSVP_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getRsvpEntries(): RsvpEntry[] {
  try {
    const raw = window.localStorage.getItem(RSVP_ENTRIES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addRsvp(entry: RsvpEntry) {
  try {
    const ids = getRsvps();
    if (!ids.includes(entry.eventId)) {
      window.localStorage.setItem(
        RSVP_STORAGE_KEY,
        JSON.stringify([...ids, entry.eventId]),
      );
    }
    window.localStorage.setItem(
      RSVP_ENTRIES_KEY,
      JSON.stringify([...getRsvpEntries(), entry]),
    );
  } catch {
    // storage unavailable — visual prototype, ignore
  }
}

export function removeRsvp(eventId: string): RsvpEntry[] {
  try {
    const entries = getRsvpEntries();
    const removed = entries.filter((e) => e.eventId === eventId);
    window.localStorage.setItem(
      RSVP_STORAGE_KEY,
      JSON.stringify(getRsvps().filter((id) => id !== eventId)),
    );
    window.localStorage.setItem(
      RSVP_ENTRIES_KEY,
      JSON.stringify(entries.filter((e) => e.eventId !== eventId)),
    );
    return removed;
  } catch {
    return [];
  }
}
