import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Providers } from "./provider";
import "./globals.scss";

const font = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL as string),
  applicationName: "Devlink",
  title: "Devlink",
  description:
    "Simplify your online presence with a single link that consolidates all your social profiles and personal information.",
  authors: [
    {
      name: "Phoenix",
      url: "",
    },
  ],
  generator: "Next.js,",
  keywords: ["Next.js", "React", "devlink"],
  referrer: "origin",
  creator: "phoenix",
  openGraph: {
    title: "Devlink",
    description:
      "Simplify your online presence with a single link that consolidates all your social profiles and personal information.",
    url: process.env.NEXT_PUBLIC_FRONTEND_URL,
    siteName: "Traverse",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Devlink",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
