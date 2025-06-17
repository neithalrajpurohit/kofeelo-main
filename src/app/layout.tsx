import type { Metadata } from "next";

import "./globals.css";
import localFont from "next/font/local";

const circeRoundRegular = localFont({
  src: "./fonts/CirceRounded-Regular.otf",
});

export const metadata: Metadata = {
  title: "Koffelo - United by Coffee",
  description: "Crafted with care and driven by purpose.",
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
