import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pool-Konfigurator | Europa Pool",
  description:
    "Interaktiver Konfigurator zur Auswahl des idealen Europa-Pool-GFK-Beckens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} antialiased`}>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
