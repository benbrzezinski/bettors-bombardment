import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bettors Bombardment",
  description: "Fun Local Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-dvh flex justify-center items-center py-[50px] px-[15px] container antialiased relative">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
