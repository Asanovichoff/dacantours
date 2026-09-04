import type { Metadata, Viewport } from "next";

// Self-hosted, so the build makes no call to Google and visitors make no
// third-party request.
import "@fontsource-variable/inter";
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
    default: "DACANTOURS — Kyrgyzstan Expedition & US National Park Tours",
    template: "%s · DACANTOURS",
  },
  description:
    "A ten-day expedition through the Tien Shan mountains of Kyrgyzstan — nomadic yurt camps, alpine lakes and horseback riding. Waitlist now open. Plus small-group guided tours across America's national parks.",
  keywords: [
    "Kyrgyzstan tour",
    "Tien Shan expedition",
    "Kyrgyzstan waitlist",
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
    title: "DACANTOURS — Kyrgyzstan Expedition & US National Park Tours",
    description:
      "Ten days through the Tien Shan — yurt camps, alpine lakes, horseback. Waitlist now open.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DACANTOURS — Kyrgyzstan Expedition & US National Park Tours",
    description:
      "Ten days through the Tien Shan — yurt camps, alpine lakes, horseback. Waitlist now open.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#05080f", // matches the page ground
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
