"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useStore from "@/store";

export default function NewGameBtn() {
  const { resetStore } = useStore();
  const router = useRouter();

  const newGame = () => {
    resetStore();
    router.replace("/");
  };

  return (
    <Button className="text-sm md:text-lg md:h-full" onClick={newGame}>
      New Game
    </Button>
  );
}
