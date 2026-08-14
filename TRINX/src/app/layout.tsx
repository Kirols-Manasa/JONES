 import "@/styles/globals.css";

import Header from "@/layout/Header/Header";
import Footer from "@/layout/Footer/";
import LinesScroll from "@/LinesScroll";
import GridOverlayFONT from "@/GridOverlayFONT";
import Intro from "@/intro";
import PageTransition from "@/PageTransitionRout";
import ClientOnly from "@/ClientOnly";

import { type Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "JONES-SODA",
  description: "Made with pure cane sugar and featuring bold, unique flavors. Jones Soda is a one-of-a-kind premium craft soda known for its ever-changing labels since 1996.",
  keywords: ["jones soda", "craft soda", "cane sugar soda", "premium soda", "berry lemonade", "cream soda", "green apple soda"],
  authors: [{ name: "Jones Soda Co.", url: "https://www.jonessoda.com" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Jones Soda Co. | The Original Craft Soda",
    description: "Made with pure cane sugar and featuring bold, unique flavors. Jones Soda is a one-of-a-kind premium craft soda known for its ever-changing labels since 1996.",
    url: "https://jones-ten.vercel.app",
    siteName: "Jones Soda Co.",
    images: [{ url: "/images/soda-CreamSoda.webp", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jones Soda Co. | The Original Craft Soda",
    description: "Made with pure cane sugar and featuring bold, unique flavors. Jones Soda is a one-of-a-kind premium craft soda known for its ever-changing labels since 1996.",
    images: ["/images/soda-CreamSoda.webp"],
  },
  robots: { index: true, follow: true },
};

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={hankenGrotesk.className}>
        <Intro />
        <LinesScroll>
          <Header />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
          {process.env.NODE_ENV === "development" && <GridOverlayFONT />}
        </LinesScroll>
        {/* ✅ HoverMouse lazy loaded */}
        <ClientOnly />
      </body>
    </html>
  );
}