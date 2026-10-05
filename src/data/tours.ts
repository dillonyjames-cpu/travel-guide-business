import type { Media } from "../lib/media";

/**
 * WAYASIA.TRAVEL — tour content.
 *
 * The current tour below mirrors the supplied itinerary spreadsheet (Kansai,
 * November 20–29, 2026) and is the source of truth for the public website.
 * Internal planning costs are deliberately NOT part of this data.
 *
 * VIDEO: drop supplied footage into `public/videos/` and add e.g.
 *   video: "/videos/koyasan.mp4"
 * to any media entry. Sections render the video when present (muted, looping,
 * lazy) and fall back to the still image when it is absent.
 */

export type ItineraryVariant = "quiet" | "split" | "showcase" | "sequence" | "closing";

export type ItineraryDay = {
  day: number;
  dateLabel: string;
  weekday: string;
  /** Destination-led day title */
  title: string;
  /** Small tracked label shown with the day */
  region: string;
  activities: string[];
  media: Media[];
  variant: ItineraryVariant;
  /** One-line editorial sentence — used over/beside the imagery */
  lead?: string;
  /** Guest-facing copy used where the final schedule is not yet public */
  placeholder?: string;
  /** Caption displayed beneath the media */
  caption?: string;
};

export type Tour = {
  slug: string;
  /** Full public tour name */
  name: string;
  /** Short display title used in the hero */
  heroTitle: string;
  dateRange: string;
  duration: string;
  region: string;
  style: string;
  hero: Media;
  /**
   * Rotating background shown behind the header/hero, in itinerary order.
   * Each entry plays its `video` when the file exists in public/videos and
   * falls back to the still image when it does not (see public/videos/README.md).
   */
  heroReel: Media[];
  intro: {
    heading: string;
    paragraphs: string[];
    image: Media;
  };
  days: ItineraryDay[];
};

export const currentTour: Tour = {
  slug: "kansai-japan-journey",
  name: "Kansai & Japan Journey",
  heroTitle: "Kansai & Japan",
  dateRange: "November 20–29, 2026",
  duration: "10 days",
  region: "Kansai and Central/Western Japan",
  style: "Guided cultural journey",
  hero: {
    image: "/media/hero-kansai-1920.jpg",
    alt: "Traditional Japanese temple rooftops rising through autumn forest in the Kansai region",
    // video: "/videos/wayasia-hero.mp4",
  },
  heroReel: [
    {
      image: "/media/hero-kansai-1920.jpg",
      alt: "Traditional Japanese temple rooftops rising through autumn forest in the Kansai region",
      video: "/videos/wayasia-hero.mp4",
    },
    {
      image: "/media/kansai-arrival-1920.jpg",
      alt: "Osaka and the Kansai waterfront glowing at night on arrival",
      video: "/videos/kansai-arrival.mp4",
    },
    {
      image: "/media/koyasan-temple-1920.jpg",
      alt: "Temple architecture at Koyasan surrounded by autumn forest",
      video: "/videos/koyasan.mp4",
    },
    {
      image: "/media/osaka-city-1920.jpg",
      alt: "Osaka at night, streets lit and full of movement",
      video: "/videos/osaka.mp4",
    },
    {
      image: "/media/shirakawago-landscape-1920.jpg",
      alt: "Gassho-style farmhouse roofs in Shirakawago beneath forested mountains in autumn",
      video: "/videos/shirakawago.mp4",
    },
    {
      image: "/media/kyoto-night-1920.jpg",
      alt: "Kyoto temple grounds illuminated at night",
      video: "/videos/kyoto-night.mp4",
    },
    {
      image: "/media/miyajima-torii-1920.jpg",
      alt: "The great torii gate of Itsukushima Shrine standing in the sea at Miyajima",
      video: "/videos/miyajima.mp4",
    },
  ],
  intro: {
    heading: "A Journey Through Japan",
    paragraphs: [
      "This journey moves through several distinct sides of Japan. It begins at Kansai International Airport and travels onward to Koyasan, where temple lodging sits among forested mountains, and into Osaka, where the rhythm of the country changes entirely.",
      "North then to Shirakawa-go and Kanazawa — traditional architecture, mountain scenery, rural landscapes — before arriving in Kyoto for its temples and evening illuminations, and continuing to Hiroshima and Miyajima, places of history approached with care and context.",
      "Every day is planned and guided, so the journey itself can unfold without friction: the transfers, the meals, the temples, and the hours in between.",
    ],
    image: {
      image: "/media/journey-intro-1920.jpg",
      alt: "A quiet temple corridor in Japan lit by late afternoon light",
    },
  },
  days: [
    {
      day: 1,
      dateLabel: "November 20",
      weekday: "Friday",
      title: "International Departure",
      region: "Travel Day",
      activities: ["International departure — travel day"],
      media: [],
      variant: "quiet",
      lead: "The journey begins in the air, westbound toward Japan.",
      placeholder: "Departure details are confirmed individually with each traveller.",
    },
    {
      day: 2,
      dateLabel: "November 21",
      weekday: "Saturday",
      title: "Arrival in Kansai",
      region: "Kansai",
      activities: [
        "Arrival at Kansai International Airport",
        "Hotel transfer",
        "Dinner",
        "Hotel stay",
      ],
      media: [
        {
          image: "/media/kansai-arrival-1920.jpg",
          alt: "Osaka and the Kansai waterfront glowing at night on arrival",
          // video: "/videos/kansai-arrival.mp4",
        },
      ],
      variant: "split",
      lead: "Landing at Kansai International Airport, the journey begins.",
      caption: "Kansai · Arrival",
    },
    {
      day: 3,
      dateLabel: "November 22",
      weekday: "Sunday",
      title: "Koyasan",
      region: "Mountain Temples",
      activities: [
        "Transfer toward Koyasan",
        "Luggage transfer",
        "Lunch",
        "Koyasan temple experience",
        "Temple dinner",
      ],
      media: [
        {
          image: "/media/koyasan-temple-1920.jpg",
          alt: "Temple architecture at Koyasan surrounded by autumn forest",
          // video: "/videos/koyasan.mp4",
        },
        {
          image: "/media/koyasan-forest-1920.jpg",
          alt: "Forest path winding between traditional Buddhist temple buildings at Koyasan",
        },
      ],
      variant: "showcase",
      lead: "A night among temple halls, cedar forest and autumn colour.",
      caption: "Koyasan · Temple stay",
    },
    {
      day: 4,
      dateLabel: "November 23",
      weekday: "Monday",
      title: "Osaka",
      region: "The City",
      activities: ["Temple breakfast", "Osaka sightseeing", "Dinner", "Transfer to hotel", "Hotel stay"],
      media: [
        {
          image: "/media/osaka-city-1920.jpg",
          alt: "Osaka at night, streets lit and full of movement",
          // video: "/videos/osaka.mp4",
        },
        {
          image: "/media/osaka-street-1920.jpg",
          alt: "Evening street scene in Osaka with lanterns and shopfronts",
        },
      ],
      variant: "showcase",
      lead: "From mountain silence to the energy of modern urban Japan.",
      caption: "Osaka · Sightseeing",
    },
    {
      day: 5,
      dateLabel: "November 24",
      weekday: "Tuesday",
      title: "Shirakawa-go",
      region: "Rural Japan",
      activities: ["Hotel breakfast", "Transfer toward Shirakawa-go"],
      media: [
        {
          image: "/media/shirakawago-landscape-1920.jpg",
          alt: "Gassho-style farmhouse roofs in Shirakawago beneath forested mountains in autumn",
          // video: "/videos/shirakawago.mp4",
        },
      ],
      variant: "showcase",
      lead: "Gassho-style houses, mountain scenery and the colours of autumn.",
      caption: "Shirakawa-go · Traditional architecture",
    },
    {
      day: 6,
      dateLabel: "November 25",
      weekday: "Wednesday",
      title: "Traditional Japan",
      region: "Gosho House",
      activities: ["Gosho House stay", "Dinner"],
      media: [
        {
          image: "/media/traditional-house-1920.jpg",
          alt: "Interior of a traditional Japanese house with tatami and timber details",
          // video: "/videos/gosho-house.mp4",
        },
        {
          image: "/media/traditional-dinner-1920.jpg",
          alt: "A traditional Japanese dinner served in the evening",
        },
      ],
      variant: "split",
      lead: "An intimate stay in a traditional house — architecture, atmosphere and dinner at day's end.",
      caption: "Gosho House · Traditional stay",
    },
    {
      day: 7,
      dateLabel: "November 26",
      weekday: "Thursday",
      title: "Kanazawa → Kyoto",
      region: "Kanazawa · Kyoto",
      activities: [
        "Hotel breakfast",
        "Kanazawa",
        "Transfer toward Kyoto",
        "Kiyomizu-dera illumination",
        "Nijo Castle illumination",
        "Kyoto hotel",
      ],
      media: [
        {
          image: "/media/kanazawa-district-1920.jpg",
          alt: "Historic wooden teahouse district in Kanazawa",
          // video: "/videos/kanazawa.mp4",
        },
        {
          image: "/media/kyoto-temple-1920.jpg",
          alt: "Temple and pagoda rooftops in Kyoto",
        },
        {
          image: "/media/kyoto-night-1920.jpg",
          alt: "Kyoto temple grounds illuminated at night",
          // video: "/videos/kyoto-night.mp4",
        },
      ],
      variant: "sequence",
      lead: "An old castle town by day — then Kyoto after dark.",
      caption: "Kyoto · Illuminations",
    },
    {
      day: 8,
      dateLabel: "November 27",
      weekday: "Friday",
      title: "Miyajima & Hiroshima",
      region: "The Inland Sea",
      activities: ["Miyajima", "Transfer to Hiroshima", "Hiroshima hotel"],
      media: [
        {
          image: "/media/miyajima-torii-1920.jpg",
          alt: "The great torii gate of Itsukushima Shrine standing in the sea at Miyajima",
          // video: "/videos/miyajima.mp4",
        },
        {
          image: "/media/hiroshima-city-1920.jpg",
          alt: "Hiroshima city seen quietly in the late afternoon",
        },
      ],
      variant: "showcase",
      lead: "Shrine, sea and the streets of Miyajima — before the journey continues to Hiroshima.",
      caption: "Miyajima · Itsukushima",
    },
    {
      day: 9,
      dateLabel: "November 28",
      weekday: "Saturday",
      title: "Final Experiences",
      region: "Journey",
      activities: [],
      media: [],
      variant: "quiet",
      lead: "The final full day of the journey.",
      placeholder:
        "This day's programme is being finalised. Confirmed guests receive the complete schedule before departure.",
    },
    {
      day: 10,
      dateLabel: "November 29",
      weekday: "Sunday",
      title: "Departure",
      region: "Departure",
      activities: ["Departure"],
      media: [
        {
          image: "/media/japan-departure-1920.jpg",
          alt: "A last quiet view of Japan at dusk before departure",
        },
      ],
      variant: "closing",
      lead: "Ten days through temples, traditional villages, historic cities and cultural landmarks.",
      caption: "Departure · November 29",
    },
  ],
};

/**
 * The next tour is not yet published. Replace this object's details when the
 * journey is finalised — the page is designed to switch from "coming soon" to
 * a full tour presentation without any structural changes.
 */
export const upcomingTour = {
  slug: "next-journey",
  name: "Next Journey",
  status: "coming-soon" as const,
  announcement: "A new Wayasia.travel journey through Japan is currently being developed.",
  hero: {
    image: "/media/next-journey-1920.jpg",
    alt: "Atmospheric Japanese landscape shrouded in morning mist",
  },
};

export const tourCardData = [
  {
    eyebrow: "Current Tour",
    title: currentTour.name,
    meta: currentTour.dateRange,
    detail: currentTour.region,
    image: currentTour.hero,
    href: "/",
    cta: "View the journey",
    status: "current" as const,
  },
  {
    eyebrow: "Next Tour",
    title: upcomingTour.name,
    meta: "Coming Soon",
    detail: "New dates in development",
    image: upcomingTour.hero,
    href: "/next-tour",
    cta: "Register interest",
    status: "upcoming" as const,
  },
];
