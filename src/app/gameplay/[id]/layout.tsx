import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bettors Bombardment | Gameplay",
};

export default function GameplayDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
