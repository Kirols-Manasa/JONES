import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JONES-SHOP",
  description: "Six handcrafted soda flavors in real glass bottles. Cane sugar, real fruit, no shortcuts.",
  keywords: ["jones soda", "craft soda", "glass bottle", "cane sugar"],
  authors: [{ name: "JONES Soda Co." }],

  openGraph: {
    title: "JONES Soda Co. — Shop",
    description: "Pick your flavor. $29.99 per 12-pack.",
    images: ["/images/og-shop.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "JONES Soda Co. — Shop",
    description: "Pick your flavor. $29.99 per 12-pack.",
    images: ["/images/og-shop.jpg"],
  },

  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}