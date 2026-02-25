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
  title: "GlobeeLink — Global eSIM Coming Soon | Be First to Connect",
  description:
    "GlobeeLink is launching the world's smartest eSIM platform. Get early access, exclusive discounts, and instant connectivity in 150+ countries.",
  keywords: ["eSIM", "global connectivity", "travel", "roaming", "data plan", "GlobeeLink"],
  icons: {
    icon: "/globee-logo.png",
    apple: "/globee-logo.png",
  },
  openGraph: {
    title: "GlobeeLink — Global eSIM Coming Soon",
    description:
      "Get early access to the world's smartest eSIM platform. Instant connectivity in 150+ countries.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobeeLink — Global eSIM Coming Soon",
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
