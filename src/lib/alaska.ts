/**
 * The Alaska promo trip: 28 November – 5 December 2026.
 *
 * The itinerary is Akan's, transcribed with light copy-editing for the web.
 * Deliberately absent: a price and a spots-remaining count. Interest is
 * collected through the same form as the rest of the site and quoted by
 * reply.
 *
 * Every image referenced here lives in /public/images/alaska — see the
 * README in that folder for how to swap in real photographs.
 */

const IMG = "/images/alaska";

export const ALASKA = {
  dates: "28 Nov – 5 Dec 2026",
  /** Departure date, used for the countdown. Local midnight. */
  departsISO: "2026-11-28T00:00:00",
  /**
   * Stills behind the headline. With `heroVideo` set they are unused; clear
   * `heroVideo` and the hero cross-fades these instead.
   */
  heroFrames: [`${IMG}/hero-1.webp`, `${IMG}/hero-2.webp`, `${IMG}/hero-3.webp`],

  /**
   * Akan's aurora clip. Trimmed to a seamless loop with a 1.5s cross-dissolve
   * at the seam, silent, and served as WebM first with MP4 behind it — about
   * 0.5 MB and 1.4 MB respectively for 13.6 seconds.
   *
   * `poster` is the clip's own first frame, so nothing shifts when playback
   * starts and it is what shows if autoplay is refused (iOS low-power mode).
   *
   * Set this to null to fall back to the cross-faded stills.
   */
  heroVideo: {
    webm: `${IMG}/aurora.webm`,
    mp4: `${IMG}/aurora.mp4`,
    poster: `${IMG}/aurora-poster.webp`,
  } as { webm: string; mp4: string; poster: string } | null,

  intro:
    "Seven days chasing the aurora across interior Alaska — dog sledding outside Fairbanks, the Chena Hot Springs under a green sky, glaciers and Alyeska above Anchorage, and late nights out looking up.",

  facts: [
    { label: "Dates", value: "28 Nov – 5 Dec" },
    { label: "Starts in", value: "Seattle" },
    { label: "Route", value: "Fairbanks & Anchorage" },
    { label: "Group size", value: "Max 12" },
  ],

  /**
   * Akan's own photographs from Alaska. Deliberately unlabelled — they are
   * not tied to particular days, so the reel presents them as a set. Ordered
   * to alternate sky, people and activity rather than grouping all the
   * aurora shots together.
   *
   * Two sizes each: `thumb` is what the reel carries — 22 of them on screen
   * at once, so they are cut to 640px and total about 600 KB — and `full` is
   * fetched only when someone opens a photo.
   */
  gallery: Array.from({ length: 22 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { thumb: `${IMG}/thumbs/alaska-${n}.webp`, full: `${IMG}/alaska-${n}.webp` };
  }),

  itinerary: [
    {
      day: 1,
      title: "Seattle, then north",
      place: "Seattle → Fairbanks",
      items: [
        "Fly into Seattle and have breakfast together",
        "Snoqualmie Falls",
        "The world's first Starbucks",
        "Night flight to Fairbanks",
        "The Northern Lights on the way in, if we're lucky",
      ],
    },
    {
      day: 2,
      title: "Dogs, and the first proper night out",
      place: "Fairbanks",
      items: [
        "A slow start — breakfast at 11",
        "Dog sledding",
        "Santa's House and the gift shop",
        "Dinner at the house, and getting to know everyone",
        "Out hunting the Northern Lights until 2am",
      ],
    },
    {
      day: 3,
      title: "Hot springs and carved ice",
      place: "Chena",
      items: [
        "A slow start and breakfast",
        "The Chena Hot Springs",
        "The Ice Museum",
        "Dinner out",
        "Out for the lights again, until 3am",
      ],
    },
    {
      day: 4,
      title: "Ice, engines, and a flight south",
      place: "Fairbanks → Anchorage",
      items: [
        "Breakfast",
        "The ice rink",
        "Snowmobiling",
        "Farewell dinner, then the flight to Anchorage",
      ],
    },
    {
      day: 5,
      title: "Glaciers",
      place: "Anchorage",
      items: [
        "Out to the glaciers",
        "Helicopter tour — optional extra",
        "The petting zoo",
        "Dinner and games",
      ],
    },
    {
      day: 6,
      title: "A morning on the mountain",
      place: "Girdwood → Anchorage",
      items: [
        "Morning at the Alyeska ski resort",
        "Back to Anchorage at 5pm",
        "Dinner and games",
      ],
    },
    {
      day: 7,
      title: "Seward, and home",
      place: "Seward → Seattle",
      items: [
        "Out to Seward Harbor",
        "The museum",
        "A walk through town",
        "Back to Anchorage for a farewell dinner",
        "Flight to Seattle, then onward flights home",
      ],
    },
  ],
} as const;
