import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "2Stepz Fitness & Dance Studio",
    short_name: "2Stepz",
    description:
      "Nagpur's boutique dance-fitness studio since 2015 — Zumba, Power Garba, Bokwa, Pilates and more in Gokulpeth.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffbf4",
    theme_color: "#fffbf4",
    lang: "en-IN",
    categories: ["fitness", "health", "lifestyle"],
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
