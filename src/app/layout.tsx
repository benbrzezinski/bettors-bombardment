import type { Metadata } from "next";
import MainLayout from "@/components/main-layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bettors Bombardment",
  description: "Fun local game to play with your friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
