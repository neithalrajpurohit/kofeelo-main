import type { Metadata } from "next";

import "./globals.css";
import localFont from "next/font/local";

const circeRoundRegular = localFont({
  src: "./fonts/CirceRounded-Regular.otf",
});

export const metadata: Metadata = {
  title: "Caffeine - Discover The Art of Perfect Coffee",
  description:
    "Experience the rich and bold flavors of our signature coffee blends.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={circeRoundRegular.className}>{children}</body>
    </html>
  );
}
