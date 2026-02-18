import type { Metadata } from "next";
import { DM_Serif_Text, Inter } from "next/font/google";
import "./globals.css";

const dMSerif = DM_Serif_Text({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400"
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evrly",
  description: "List users from Evrly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dMSerif.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
