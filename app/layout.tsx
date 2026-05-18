import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Cinzel } from "next/font/google";
import "./globals.css";

const fontThai = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-plex-thai",
  display: "swap",
});

const fontBrand = Cinzel({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — Tripoom Singhaart | Creative Developer & Systems Architect",
  description:
    "Motion Graphics · VFX · Automation · Full-Stack Development · AI — The professional journey and project portfolio of Tripoom Singhaart.",
  openGraph: {
    title: "Tripoom Singhaart — Creative Developer & Systems Architect",
    description: "Building at the intersection of code, motion, and AI. High-end visuals meets intelligent systems.",
    type: "profile",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${fontThai.variable} ${fontBrand.variable} ${fontThai.className}`}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="font-sans antialiased min-h-screen">
        <div className="portfolio-shell min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
