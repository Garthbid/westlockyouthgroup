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
    month: "SEP",
    day: "25",
    badgeBg: "bg-pinkpale",
    title: "Youth Bowling Night",
    time: "7:00 PM",
    location: "Westlock",
    dateLabel: "Friday, September 25",
    tagline: "strikes, spares & snacks",
    description: [
      "Lace up and let it fly! We're taking over the lanes for a night of strikes, gutter balls, and way too much celebrating over spares. Zero skill required — half of us bowl with the bumpers up anyway.",
      "Come with a team name in mind. Bragging rights are on the line, and the losing team buys the fries.",
    ],
    plan: [
      { time: "6:45", item: "Meet at Westlock Gospel Chapel" },
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
      "Drop-off and pickup both happen at Westlock Gospel Chapel. Leaders drive between venues.",
  },
  {
    id: "board-games",
    image: "/images/boardgames.jpg",
    alt: "Board game pieces and dice on a table",
    month: "OCT",
    day: "9",
    badgeBg: "bg-mint",
    title: "Board Games & Bible Quizzes",
    time: "7:00 PM",
    location: "Westlock",
    dateLabel: "Friday, October 9",
    tagline: "dice, laughs & trivia showdowns",
    description: [
      "Tables full of board games, snacks within arm's reach, and Bible quiz showdowns where knowing your Old Testament kings can actually win you bragging rights. Competitive? Great. Just here to hang out? Also great.",
      "Never opened a Bible before? Zero problem — teams are mixed so everyone's got a shot, and half the fun is the wild guesses anyway.",
    ],
    plan: [
      { time: "7:00", item: "Doors open — grab a game & a snack" },
      { time: "7:45", item: "Bible quiz tournament kicks off" },
      { time: "8:30", item: "Free play — rematches & new games" },
      { time: "9:30", item: "Parent pickup" },
    ],
    bring: [
      "Your favourite board game if you have one",
      "A friend — everyone's welcome",
      "Your best trivia face",
    ],
    cost: "Free",
    parentNote:
      "Drop-off and pickup both happen at the church. Snacks are provided — let us know about allergies when you RSVP.",
  },
  {
    id: "movie-night",
    image: "/images/movie.jpg",
    alt: "Popcorn and a movie screen glowing in a dark room",
    month: "OCT",
    day: "23",
    badgeBg: "bg-mint",
    title: "Youth Movie Night",
    time: "7:00 PM",
    location: "Westlock Gospel Chapel",
    dateLabel: "Friday, October 23",
    tagline: "popcorn, blankets & the big screen",
    description: [
      "Big screen, big speakers, and an unreasonable amount of popcorn. We pick a movie everyone can enjoy, pile up the blankets and beanbags, and settle in for the night.",
      "We're taking over Westlock Gospel Chapel for the night — bring a friend and come claim a good spot early.",
    ],
    plan: [
      { time: "7:00", item: "Doors open — claim your spot" },
      { time: "7:20", item: "Popcorn's ready, movie starts" },
      { time: "9:30", item: "Parent pickup" },
    ],
    bring: [
      "A blanket or pillow to get comfy",
      "$5 if you want extra snacks",
      "A friend or two!",
    ],
    cost: "Free — popcorn's on us",
    parentNote:
      "Drop-off and pickup both happen at Westlock Gospel Chapel. We wrap up by 9:30.",
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
