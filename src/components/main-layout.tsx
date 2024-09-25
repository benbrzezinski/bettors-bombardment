"use client";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import useTranslation from "@/store/use-translation";

const font = Inter({
  subsets: ["latin"],
});

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { lng } = useTranslation();

  return (
    <html lang={lng}>
      <body className={font.className}>
        <main className="min-h-dvh flex justify-center items-center py-[50px] px-[15px] container antialiased relative">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
