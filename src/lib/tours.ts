/**
 * Tour content.
 *
 * The source project loaded this from a Flask + SQLAlchemy API. There is no
 * backend here, so the seed data ships in the bundle and is baked into the
 * HTML at build time.
 *
 * Two behaviours from the API are reproduced deliberately:
 *   1. GET /tours/ filtered on `is_active`, so the Kyrgyzstan Preview record
 *      never appeared in the grid — the page has its own Kyrgyzstan section
 *      instead. Flip `isActive` to true to surface it as a card.
 *   2. Results were ordered by `created_at DESC`, i.e. reverse seed order.
 *      `activeTours` preserves that ordering.
 */

export type Tour = {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Custom";
  maxGroupSize: number;
  isActive: boolean;
};

/** In seed order, matching the database ids. */
export const tours: Tour[] = [
  {
    id: 1,
    title: "Canyons Adventure",
    location:
      "Zion, Antelope Canyon, Horseshoe Bend, Monument Valley, Grand Canyon",
    description:
      "Iconic Southwest loop: Zion's Angels Landing, Antelope Canyon beams, panoramic Horseshoe Bend, Navajo lands in Monument Valley, and the mighty Grand Canyon.",
    price: 2300,
    duration: "8 days",
    difficulty: "Moderate",
    maxGroupSize: 12,
    isActive: true,
  },
  {
    id: 2,
    title: "Alaska Northern Lights & Wilderness",
    location: "Fairbanks, Anchorage, Chena Hot Springs, Denali region",
    description:
      "Chase the Aurora, relax at Chena Hot Springs, try dog sledding and snowmobile tours, and explore Alaska's pristine wilderness.",
    price: 2800,
    duration: "8 days",
    difficulty: "Easy",
    maxGroupSize: 12,
    isActive: true,
  },
  {
    id: 3,
    title: "Hawaii Oahu Adventure",
    location: "Oahu, Honolulu",
    description:
      "Surf Waikiki, dive vibrant reefs, swim with dolphins, visit Byodo-In Temple, hike to waterfalls, and enjoy panoramic island views.",
    price: 2600,
    duration: "7 days",
    difficulty: "Easy",
    maxGroupSize: 12,
    isActive: true,
  },
  {
    id: 4,
    title: "West Coast National Parks",
    location: "Sequoia, Yosemite, Big Sur, Pacific Coast",
    description:
      "See the world's largest trees in Sequoia, hike Yosemite's granite valleys, and cruise the dramatic Big Sur coastline along the Pacific.",
    price: 2100,
    duration: "7 days",
    difficulty: "Moderate",
    maxGroupSize: 12,
    isActive: true,
  },
  {
    id: 5,
    title: "Kyrgyzstan Preview - Coming Soon!",
    location: "Tien Shan Mountains, Kyrgyzstan",
    description:
      "Upcoming: nomadic yurt stays, horseback riding through pristine valleys, alpine lakes, and authentic Kyrgyz culture. Join the waitlist for early access!",
    price: 3200,
    duration: "10 days",
    difficulty: "Moderate",
    maxGroupSize: 10,
    isActive: false,
  },
  {
    id: 6,
    title: "Custom Adventure - Your Way",
    location: "Your Choice of Destination",
    description:
      "Design your perfect adventure! Choose your destination, dates, group size, and activities. From solo expeditions to family trips, we'll create a personalized itinerary just for you.",
    price: 0,
    duration: "Custom",
    difficulty: "Custom",
    maxGroupSize: 20,
    isActive: true,
  },
];

/** What GET /tours/ returned: active only, newest first. */
export const activeTours: Tour[] = tours
  .filter((t) => t.isActive)
  .slice()
  .reverse();

export type TourDetails = {
  slug: string;
  title: string;
  gather: string;
  highlights: string[];
  notes: string[];
};

export const tourDetails: Record<string, TourDetails> = {
  canyons: {
    slug: "canyons",
    title: "Canyons Adventure",
    gather: "Las Vegas, Nevada",
    highlights: [
      "Zion National Park (Angels Landing), Utah",
      "Antelope Canyon, Arizona",
      "Horseshoe Bend, Arizona",
      "Monument Valley, Utah",
      "Forrest Gump Point, Utah",
      "Grand Canyon, Arizona",
    ],
    notes: [
      "Strenuous hike permits may be required for Angels Landing",
      "Best light for Antelope Canyon is mid-day",
    ],
  },
  alaska: {
    slug: "alaska",
    title: "Alaska Northern Lights & Wilderness",
    gather: "Seattle, Washington",
    highlights: [
      "Fairbanks",
      "Dog sledding",
      "Chena Hot Springs",
      "Ice skating",
      "Aurora (Northern Lights)",
      "Snowmobile adventure",
      "Anchorage",
      "Helicopter tour (optional $500–$600)",
      "Skiing or Snowboarding",
      "Hiking",
    ],
    notes: [
      "Aurora visibility depends on weather and KP index",
      "Helicopter seat availability is limited",
    ],
  },
  hawaii: {
    slug: "hawaii",
    title: "Hawaii Ocean & Volcano Experience",
    gather: "Los Angeles, California",
    highlights: [
      "Oahu Island, Honolulu",
      "Surfing",
      "Diving",
      "Swim with Dolphins",
      "Whale watching (seasonal)",
      "Parachute jump ($200–$350)",
      "Hiking",
      "Waterfalls",
      "Byodo-In Temple",
      "Panoramic viewpoints",
    ],
    notes: [
      "Marine wildlife activities are weather dependent",
      "Parachute jump requires age/weight compliance",
    ],
  },
  "west-coast": {
    slug: "west-coast",
    title: "West Coast National Parks",
    gather: "Los Angeles, California",
    highlights: [
      "Sequoia National Park",
      "World's largest trees",
      "Yosemite National Park",
      "Yosemite Valley hikes",
      "Pacific Ocean",
      "Big Sur coastal drive",
    ],
    notes: [
      "Some roads may close in winter",
      "Yosemite permits are seasonal",
    ],
  },
};

/** Carried over from App.jsx unchanged. */
export function mapTitleToSlug(tour: Tour): string | null {
  const t = `${tour.title} ${tour.location}`.toLowerCase();
  if (
    t.includes("alaska") || t.includes("denali") ||
    t.includes("fairbanks") || t.includes("anchorage")
  ) return "alaska";
  if (
    t.includes("grand canyon") || t.includes("canyon") || t.includes("canyons") ||
    t.includes("zion") || t.includes("monument valley") ||
    t.includes("horseshoe bend") || t.includes("antelope")
  ) return "canyons";
  if (t.includes("hawaii") || t.includes("honolulu") || t.includes("oahu"))
    return "hawaii";
  if (
    t.includes("west") || t.includes("sequoia") || t.includes("yosemite") ||
    t.includes("big sur") || t.includes("yellowstone") ||
    t.includes("teton") || t.includes("rocky mountain")
  ) return "west-coast";
  return null;
}

export const CONTACT = {
  email: "dacantour@gmail.com",
  phone: "+1 (425) 546-9231",
  phoneHref: "+14255469231",
  location: "Seattle, WA",
} as const;
