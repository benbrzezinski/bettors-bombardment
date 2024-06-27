"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import { GAME_MODES } from "@/constants";
import Abilities from "@/components/abilities";
import useStore, { type Player } from "@/store";

interface AbilitiesMenuProps {
  player: Player;
  betMade: boolean;
}

export default function AbilitiesMenu({ player, betMade }: AbilitiesMenuProps) {
  const { gameMode } = useStore();

  return (
    (gameMode === GAME_MODES[1] || gameMode === GAME_MODES[2]) && (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="animate-fade-in opacity-0 pointer-events-none fixed top-[90%] md:top-[50%] translate-y-[-50%] left-[0px] md:left-[15px] 2xl:left-[30px] border-l-0 md:border-l rounded-l-none md:rounded-l-md px-[10px] sm:px-[16px]"
          >
            <WandSparkles />
          </Button>
        </SheetTrigger>
        <SheetContent
          className="overflow-y-auto"
          side="left"
          onOpenAutoFocus={e => e.preventDefault()}
        >
          <SheetHeader className="mb-[20px]">
            <SheetTitle>Abilities</SheetTitle>
            <SheetDescription>
              Note: Each skill can only be used once.
            </SheetDescription>
          </SheetHeader>
          <Abilities
            id={player.id}
            value={player.value}
            abilities={player.abilities}
            abilitiesInUse={player.abilitiesInUse}
            betMade={betMade}
          />
        </SheetContent>
      </Sheet>
    )
  );
}
