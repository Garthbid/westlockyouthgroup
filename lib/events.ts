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
    id: "bowling",
    image: "/images/bowling.jpg",
    alt: "Bowling ball and pins on a lane",
    month: "APR",
    day: "25",
    badgeBg: "bg-pinkpale",
    title: "Bowling Night",
    time: "7:00 PM",
    location: "Westlock",
    dateLabel: "Friday, April 25",
    tagline: "strikes, spares & snacks",
    description: [
      "Lace up and let it fly! We're taking over the lanes for a night of strikes, gutter balls, and way too much celebrating over spares. Zero skill required — half of us bowl with the bumpers up anyway.",
      "Come with a team name in mind. Bragging rights are on the line, and the losing team buys the fries.",
    ],
    plan: [
      { time: "6:45", item: "Meet at Westlock Alliance Church" },
      { time: "7:00", item: "Roll out to the lanes together" },
      { time: "8:30", item: "Snack break & mini tournament finals" },
      { time: "9:30", item: "Parent pickup at the church" },
    ],
    bring: [
      "$10 for lanes + shoe rental",
      "Socks (trust us on this one)",
      "Your competitive spirit",
    ],
    cost: "$10",
    parentNote:
      "Drop-off and pickup both happen at Westlock Alliance Church. Leaders drive between venues.",
  },
  {
    id: "fire-faith",
    image: "/images/campfire.jpg",
    alt: "Teenagers sitting around a campfire at dusk",
    month: "MAY",
    day: "10",
    badgeBg: "bg-mint",
    title: "Fire & Faith Night",
    time: "7:00 PM",
    location: "Westlock",
    dateLabel: "Saturday, May 10",
    tagline: "campfire, questions & s'mores",
    description: [
      "Our favourite kind of night — a big bonfire, honest conversations about faith, and worship under the stars. It's chill, it's real, and there's zero pressure to have it all figured out.",
      "Bring your questions, bring a blanket, and definitely bring your appetite. The s'mores supply is, as always, unlimited.",
    ],
    plan: [
      { time: "7:00", item: "Fire's lit — hangout & yard games" },
      { time: "7:45", item: "Worship + a short honest talk" },
      { time: "8:15", item: "S'mores & fireside conversations" },
      { time: "9:30", item: "Parent pickup" },
    ],
    bring: [
      "A hoodie or blanket",
      "A lawn chair if you have one",
      "A friend — everyone's welcome",
    ],
    cost: "Free",
    parentNote:
      "The fire is fully supervised and we wrap up at 9:30 sharp. Address is texted to RSVPs the day before.",
  },
  {
    id: "ice-cream",
    image: "/images/icecream.jpg",
    alt: "Ice cream cone against a sunny yellow background",
    month: "MAY",
    day: "24",
    badgeBg: "bg-mint",
    title: "Ice Cream & Games",
    time: "7:00 PM",
    location: "Location TBA",
    dateLabel: "Saturday, May 24",
    tagline: "sprinkles & silly games",
    description: [
      "Ice cream, ridiculous lawn games, and a whole lot of sprinkles. This is the easiest possible night to bring a friend who's never been to youth group before.",
      "The location gets announced the week of — keep an eye on our socials or RSVP and we'll text you directly.",
    ],
    plan: [
      { time: "7:00", item: "Games kick off (bring your A-game)" },
      { time: "8:00", item: "Ice cream bar opens — first cone's on us" },
      { time: "9:00", item: "Parent pickup" },
    ],
    bring: [
      "$5 if you want extra scoops",
      "Sunscreen for the early evening sun",
      "A friend or two!",
    ],
    cost: "Free — first cone's on us",
    parentNote:
      "Location is announced the week of the event. RSVP and we'll text you the address and pickup details.",
  },
];

export const RSVP_STORAGE_KEY = "wyg-rsvps";
export const RSVP_ENTRIES_KEY = "wyg-rsvp-entries";

export type RsvpEntry = {
  eventId: string;
  name: string;
  phone: string;
  parentName: string;
  parentPhone: string;
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
