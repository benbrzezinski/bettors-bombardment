import { Inter } from "next/font/google";
import type { Metadata } from "next";
import MainLayout from "@/components/main-layout";
import "./globals.css";

const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bettors Bombardment",
  description: "Fun local game to play with your friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
