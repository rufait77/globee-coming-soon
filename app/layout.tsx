import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Globee — Global eSIM Coming Soon | Be First to Connect",
  description:
    "Globee is launching the world's smartest eSIM platform. Get early access, exclusive discounts, and instant connectivity in 150+ countries.",
  keywords: ["eSIM", "global connectivity", "travel", "roaming", "data plan"],
  openGraph: {
    title: "Globee — Global eSIM Coming Soon",
    description:
      "Get early access to the world's smartest eSIM platform. Instant connectivity in 150+ countries.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Globee — Global eSIM Coming Soon",
    description:
      "Get early access to the world's smartest eSIM platform. Instant connectivity in 150+ countries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
