import type { Metadata, Viewport } from "next";

// Fonts are self-hosted via npm rather than next/font/google. This keeps the
// build free of any network call to Google, removes a third-party request for
// visitors, and means the site still builds if Google Fonts is unreachable.
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/standard-italic.css";
import "./globals.css";

const SITE = "https://dacantours.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Dacan Tours — Custom Trips Across Kyrgyzstan",
    template: "%s · Dacan Tours",
  },
  description:
    "Custom-built journeys through the Tien Shan mountains of Kyrgyzstan — alpine lakes, high passes, horseback trekking and yurt camps. Design your own trip, any length, private or small group. Launching soon.",
  keywords: [
    "Kyrgyzstan tours",
    "Tien Shan trekking",
    "Song-Kul",
    "Kel-Suu",
    "horseback riding Kyrgyzstan",
    "yurt camp",
    "custom trips Kyrgyzstan",
    "Central Asia travel",
  ],
  authors: [{ name: "Dacan Tours" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Dacan Tours",
    title: "Dacan Tours — Custom Trips Across Kyrgyzstan",
    description:
      "Alpine lakes, high passes, horseback trekking and yurt camps. Trips built around you. Launching soon.",
    locale: "en_US",
    alternateLocale: ["ru_RU"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dacan Tours — Custom Trips Across Kyrgyzstan",
    description:
      "Alpine lakes, high passes, horseback trekking and yurt camps. Trips built around you. Launching soon.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#060d15",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Dacan Tours",
  url: SITE,
  description:
    "Custom-built trips across Kyrgyzstan — trekking, horseback riding and yurt stays in the Tien Shan mountains.",
  areaServed: {
    "@type": "Country",
    name: "Kyrgyzstan",
  },
  knowsLanguage: ["en", "ru", "ky"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
