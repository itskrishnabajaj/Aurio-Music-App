/* ============================================================
   2Stepz Fitness & Dance Studio — site configuration.

   Everything in VERIFIED is public, researched information about the
   studio and renders as-is. Everything in PENDING is information the
   studio has not supplied yet; those slots render as labelled
   placeholders until a real value is filled in, so the site never
   shows an invented phone number, price or class time.

   To go live: replace the empty strings in PENDING and delete nothing
   else. Each field's placeholder label is what the client currently
   sees in that position.
   ============================================================ */

export const STUDIO = {
  name: "2Stepz Fitness & Dance Studio",
  shortName: "2Stepz",
  founded: 2015,
  founder: "Madhumita Gubre",
  rating: "4.6",
  reviewCount: "88+",
  address: {
    line1: "Plot 63, Gubre Bhavan, 2nd Floor,",
    line2: "Canal Road, Gokulpeth,",
    line3: "Nagpur 440010 · near Times of India",
  },
} as const;

export const VERIFIED = {
  INSTAGRAM: "https://www.instagram.com/2stepzfitness/",
  FACEBOOK: "https://www.facebook.com/2stepzfitness/",
  JUSTDIAL:
    "https://www.justdial.com/Nagpur/2Stepz-Fitness-Dance-Studio-Near-Times-Of-India-Gokulpeth/0712PX712-X712-160112122546-L2C3_BZDET",
  MAPS: "https://www.google.com/maps/search/?api=1&query=2Stepz+Fitness+%26+Dance+Studio+Gokulpeth+Nagpur",
} as const;

/* Awaiting the studio. Empty string = not supplied = renders as a placeholder. */
export const PENDING = {
  /** Digits only, country code first, e.g. "919876543210" */
  WHATSAPP: "",
  /** e.g. "+91 98765 43210" */
  PHONE: "",
  EMAIL: "",
  YOUTUBE: "",
  /** Embed URL for the Google Maps iframe */
  MAPS_EMBED: "",
  /** e.g. "Mon–Sat · 6:00 am – 9:00 pm" */
  HOURS: "",
  PARKING: "",
} as const;

export const HAS_WHATSAPP = /^\d{10,15}$/.test(PENDING.WHATSAPP);
export const HAS_PHONE = /^\+?[\d\s]{10,18}$/.test(PENDING.PHONE);
export const HAS_EMAIL = PENDING.EMAIL.includes("@");
export const HAS_YOUTUBE = PENDING.YOUTUBE.startsWith("http");
export const HAS_MAPS_EMBED = PENDING.MAPS_EMBED.startsWith("http");
export const HAS_HOURS = PENDING.HOURS.length > 0;
export const HAS_PARKING = PENDING.PARKING.length > 0;

const DEFAULT_MSG = "Hi! I'd like to book a trial class at 2Stepz \u{1F483}";

/** WhatsApp deep link, falling back to Instagram DMs until a number exists,
    so no call to action can ever dead-end. */
export const waLink = (msg: string = DEFAULT_MSG): string =>
  HAS_WHATSAPP
    ? `https://wa.me/${PENDING.WHATSAPP}?text=${encodeURIComponent(msg)}`
    : VERIFIED.INSTAGRAM;

export const telLink = (): string => `tel:${PENDING.PHONE.replace(/\s/g, "")}`;

/** `time` is optional until the studio confirms its timetable; while it is
    absent the schedule renders a batch-timing placeholder instead. */
export type Batch = { name: string; note: string; hue: string; time?: string };

/* The formats the studio actually runs. Batch times are intentionally absent —
   see PENDING.HOURS. Add a `time` field here once the real timetable is known. */
export const SCHEDULE: Record<string, Batch[]> = {
  Mon: [
    { name: "Zumba", note: "all levels", hue: "rasp" },
    { name: "Zumba Toning", note: "light weights", hue: "rasp" },
    { name: "Power Garba", note: "signature format", hue: "tang" },
  ],
  Tue: [
    { name: "Pilates", note: "core & posture", hue: "violet" },
    { name: "Zumba", note: "all levels", hue: "rasp" },
    { name: "TRX & Functional", note: "small group", hue: "mint" },
  ],
  Wed: [
    { name: "Zumba", note: "all levels", hue: "rasp" },
    { name: "Bokwa", note: "beginner friendly", hue: "violet" },
    { name: "Strong by Zumba", note: "high intensity", hue: "rasp" },
  ],
  Thu: [
    { name: "Yoga & Meditation", note: "slow morning", hue: "mint" },
    { name: "Zumba", note: "all levels", hue: "rasp" },
    { name: "Power Garba", note: "signature format", hue: "tang" },
  ],
  Fri: [
    { name: "Zumba", note: "all levels", hue: "rasp" },
    { name: "TRX & Functional", note: "small group", hue: "mint" },
    { name: "Folk Fitness", note: "desi beats", hue: "tang" },
  ],
  Sat: [
    { name: "Strong by Zumba", note: "sweat special", hue: "rasp" },
    { name: "Kids’ Batch", note: "ages 6–14", hue: "violet" },
    { name: "Community Class", note: "bring a friend", hue: "tang" },
  ],
  Sun: [],
};
