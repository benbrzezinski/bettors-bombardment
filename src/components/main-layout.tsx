"use client";

import { useEffect } from "react";
import useTranslation from "@/store/use-translation";
import { Toaster } from "@/components/ui/toaster";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lng } = useTranslation();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lng;
    }
  }, [lng]);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
