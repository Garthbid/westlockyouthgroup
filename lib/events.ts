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
  },
];

export const RSVP_STORAGE_KEY = "wyg-rsvps";

export function getRsvps(): string[] {
  try {
    const raw = window.localStorage.getItem(RSVP_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addRsvp(eventId: string) {
  try {
    const current = getRsvps();
    if (!current.includes(eventId)) {
      window.localStorage.setItem(
        RSVP_STORAGE_KEY,
        JSON.stringify([...current, eventId]),
      );
    }
  } catch {
    // storage unavailable — visual prototype, ignore
  }
}
