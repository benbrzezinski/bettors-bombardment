import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bettors Bombardment | Game",
};

export default function GameDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
