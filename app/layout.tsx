import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import "@/app/globals.css";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

const body = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "INNIT Tattoo AI",
  description: "Idea to tattoo concept images in minutes."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-[var(--font-body)] antialiased">{children}</body>
    </html>
  );
}
