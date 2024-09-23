"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

export default function NewGameBtn() {
  const { resetStore } = useStore();
  const { lng } = useTranslation();
  const router = useRouter();

  const newGame = () => {
    resetStore();
    router.replace("/");
  };

  return (
    <Button className="text-sm md:text-lg md:h-full" onClick={newGame}>
      {t[lng].newGameBtn.text}
    </Button>
  );
}
