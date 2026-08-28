import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://dacantours.com";

/**
 * The source project shipped Vite's default index.html — titled
 * "Vite + React", with the Vite favicon and no meta description. None of this
 * is visible on the page; it is what Google, Slack, iMessage and browser tabs
 * read. The favicon and apple-icon are generated from the globe in the logo.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "DACANTOURS — Guided Tours of America's National Parks",
    template: "%s · DACANTOURS",
  },
  description:
    "Small-group guided tours through America's most spectacular wilderness — the Grand Canyon and Southwest canyons, Alaska's northern lights, Hawaii, and the West Coast national parks. Kyrgyzstan adventures coming soon.",
  keywords: [
    "US national park tours",
    "Grand Canyon tour",
    "Alaska northern lights tour",
    "Hawaii Oahu tour",
    "Yosemite Sequoia tour",
    "small group adventure travel",
    "Kyrgyzstan tours",
    "DACANTOURS",
  ],
  authors: [{ name: "DACANTOURS" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "DACANTOURS",
    title: "DACANTOURS — Guided Tours of America's National Parks",
    description:
      "Small-group guided tours through America's most spectacular wilderness. Kyrgyzstan adventures coming soon.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DACANTOURS — Guided Tours of America's National Parks",
    description:
      "Small-group guided tours through America's most spectacular wilderness. Kyrgyzstan adventures coming soon.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#111827", // matches bg-gray-900
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "DACANTOURS",
  url: SITE,
  email: "dacantour@gmail.com",
  telephone: "+1-425-546-9231",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  description:
    "Guided small-group tours of America's national parks and wilderness, with Kyrgyzstan adventures coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
