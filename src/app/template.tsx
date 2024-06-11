"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import QuitBtn from "@/components/quit-btn";

export default function RootTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        {children}
      </motion.div>
      {pathname.includes("gameplay") && <QuitBtn />}
    </>
  );
}
