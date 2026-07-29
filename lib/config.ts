/* Studio contact + weekly schedule.
   WHATSAPP/PHONE must be real digits (country code first) before launch —
   while they contain placeholders every chat CTA falls back to Instagram
   and call buttons are omitted, so nothing on the page ever dead-ends. */
export const CONTACT = {
  WHATSAPP: "91XXXXXXXXXX",
  PHONE: "+91XXXXXXXXXX",
  INSTAGRAM: "https://www.instagram.com/2stepzfitness/",
  FACEBOOK: "https://www.facebook.com/2stepzfitness/",
  JUSTDIAL:
    "https://www.justdial.com/Nagpur/2Stepz-Fitness-Dance-Studio-Near-Times-Of-India-Gokulpeth/0712PX712-X712-160112122546-L2C3_BZDET",
  MAPS: "https://www.google.com/maps/search/?api=1&query=2Stepz+Fitness+%26+Dance+Studio+Gokulpeth+Nagpur",
};

export const HAS_WHATSAPP = /^\d{10,15}$/.test(CONTACT.WHATSAPP);
export const HAS_PHONE = /^\+?\d{10,15}$/.test(CONTACT.PHONE.replace(/\s/g, ""));

const DEFAULT_MSG = "Hi! I'd like to book a trial class at 2Stepz \u{1F483}";

export const waLink = (msg: string = DEFAULT_MSG): string =>
  HAS_WHATSAPP
    ? `https://wa.me/${CONTACT.WHATSAPP}?text=${encodeURIComponent(msg)}`
    : CONTACT.INSTAGRAM;

export const telLink = (): string => `tel:${CONTACT.PHONE.replace(/\s/g, "")}`;

export type Batch = { time: string; name: string; note: string; hue: string };

/* Representative timings — replace with the studio's real weekly grid. */
export const SCHEDULE: Record<string, Batch[]> = {
  Mon: [
    { time: "7:00 am", name: "Zumba", note: "all levels", hue: "rasp" },
    { time: "6:00 pm", name: "Zumba Toning", note: "light weights", hue: "rasp" },
    { time: "7:00 pm", name: "Power Garba", note: "signature format", hue: "tang" },
  ],
  Tue: [
    { time: "7:00 am", name: "Pilates", note: "core & posture", hue: "violet" },
    { time: "6:00 pm", name: "Zumba", note: "all levels", hue: "rasp" },
    { time: "7:00 pm", name: "TRX & Functional", note: "small group", hue: "mint" },
  ],
  Wed: [
    { time: "7:00 am", name: "Zumba", note: "all levels", hue: "rasp" },
    { time: "6:00 pm", name: "Bokwa", note: "beginner friendly", hue: "violet" },
    { time: "7:00 pm", name: "Zumba", note: "all levels", hue: "rasp" },
  ],
  Thu: [
    { time: "7:00 am", name: "Yoga & Meditation", note: "slow morning", hue: "mint" },
    { time: "6:00 pm", name: "Zumba", note: "all levels", hue: "rasp" },
    { time: "7:00 pm", name: "Power Garba", note: "signature format", hue: "tang" },
  ],
  Fri: [
    { time: "7:00 am", name: "Zumba", note: "all levels", hue: "rasp" },
    { time: "6:00 pm", name: "TRX & Functional", note: "small group", hue: "mint" },
    { time: "7:00 pm", name: "Folk Fitness", note: "desi beats", hue: "tang" },
  ],
  Sat: [
    { time: "8:00 am", name: "Strong by Zumba", note: "sweat special", hue: "rasp" },
    { time: "5:00 pm", name: "Kids' Batch", note: "ages 6–14", hue: "violet" },
    { time: "6:00 pm", name: "Community Class", note: "bring a friend", hue: "tang" },
  ],
  Sun: [],
};
