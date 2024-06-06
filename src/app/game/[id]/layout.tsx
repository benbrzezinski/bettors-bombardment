import type { Metadata } from "next";
import QuitBtn from "@/components/quit-btn";

export const metadata: Metadata = {
  title: "Bettors Bombardment | Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <QuitBtn />
    </>
  );
}
