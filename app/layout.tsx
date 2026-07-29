import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://2stepzfitness.in"),
  title: "2Stepz Fitness & Dance Studio · Zumba, Power Garba & Dance Fitness in Nagpur",
  description:
    "Nagpur's boutique dance-fitness studio since 2015. Zumba, Power Garba, Bokwa, Pilates & more in Gokulpeth — led by Mrs Fit India 2022, Madhumita Gubre. Book a trial class.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "2Stepz Fitness & Dance Studio — The best hour of your day",
    description:
      "Zumba, Power Garba, Bokwa & more in Gokulpeth, Nagpur. Rated 4.6★ · Since 2015 · Led by Mrs Fit India 2022.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fffbf4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "2Stepz Fitness & Dance Studio",
  description:
    "Boutique dance-fitness studio in Gokulpeth, Nagpur offering Zumba, Power Garba, Bokwa, Pilates, yoga, TRX and kids' programs since 2015.",
  foundingDate: "2015",
  founder: {
    "@type": "Person",
    name: "Madhumita Gubre",
    award: ["Mrs Fit India 2022", "Mrs India Multimedia 2017"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 63, Gubre Bhavan, 2nd Floor, Canal Road, Gokulpeth",
    addressLocality: "Nagpur",
    addressRegion: "Maharashtra",
    postalCode: "440010",
    addressCountry: "IN",
  },
  areaServed: ["Gokulpeth", "Dharampeth", "Ramdaspeth", "Civil Lines", "Nagpur"],
  sameAs: [
    "https://www.instagram.com/2stepzfitness/",
    "https://www.facebook.com/2stepzfitness/",
    "https://www.justdial.com/Nagpur/2Stepz-Fitness-Dance-Studio-Near-Times-Of-India-Gokulpeth/0712PX712-X712-160112122546-L2C3_BZDET",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
