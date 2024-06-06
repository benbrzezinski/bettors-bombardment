import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bettors Bombardment | Results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
