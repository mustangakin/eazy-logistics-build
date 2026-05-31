import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eazylogistics.com"),
  title: {
    default: "Eazy Logistics — Fast. Transparent. Delivered.",
    template: "%s | Eazy Logistics",
  },
  description:
    "Eazy Logistics ships air, ground, maritime, and rail freight worldwide — real-time tracking, 99.98% on-time, and an ops team that actually picks up.",
  keywords: [
    "logistics",
    "freight",
    "shipping",
    "cargo tracking",
    "air freight",
    "ground freight",
    "maritime freight",
    "rail freight",
    "eazy logistics",
    "fast delivery",
    "global shipping",
  ],
  openGraph: {
    title: "Eazy Logistics — Fast. Transparent. Delivered.",
    description:
      "Real-time freight tracking across air, ground, sea, and rail. Built for businesses that can't afford surprises.",
    type: "website",
    url: "https://eazylogistics.com",
    siteName: "Eazy Logistics",
    images: [
      {
        url: "/images/hero/hero-bg.webp",
        width: 1920,
        height: 1080,
        alt: "Eazy Logistics — global freight operations hub at night",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eazy Logistics — Fast. Transparent. Delivered.",
    description: "Real-time freight tracking across air, ground, sea, and rail.",
    images: ["/images/hero/hero-bg.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Eazy Logistics",
  url: "https://eazylogistics.com",
  logo: "https://eazylogistics.com/images/hero/hero-bg.webp",
  description:
    "Eazy Logistics delivers air, ground, maritime, and rail freight worldwide with real-time tracking.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-800-EAZY-OPS",
      contactType: "customer support",
      availableLanguage: "English",
      hoursAvailable: "Mo-Su 00:00-23:59",
    },
    {
      "@type": "ContactPoint",
      email: "hello@eazylogistics.com",
      contactType: "sales",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 World Trade Center",
    addressLocality: "New York, NY",
    addressCountry: "US",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface-0 text-text-primary`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
