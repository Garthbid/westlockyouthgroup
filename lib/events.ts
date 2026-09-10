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
  cta: string;
  ctaBg: string;
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
    cta: "RSVP",
    ctaBg: "bg-pinkpale",
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
    cta: "I'M IN!",
    ctaBg: "bg-mint",
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
    cta: "DETAILS",
    ctaBg: "bg-bluepale",
  },
];
