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
import { Users } from "lucide-react";
import PlayersScoreboard from "@/components/players-scoreboard";
import { groupPlayersIfTheyAreTied, sortPlayers } from "@/lib/utils";
import useStore from "@/store";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

export default function RealTimePlayersScoreboardMenu() {
  const { players } = useStore();
  const { lng } = useTranslation();

  const sortedPlayers = sortPlayers(players);
  const groupedPlayers = groupPlayersIfTheyAreTied(sortedPlayers);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="animate-fade-in opacity-0 pointer-events-none fixed top-[90%] md:top-[50%] translate-y-[-50%] right-[0px] md:right-[15px] 2xl:right-[30px] border-r-0 md:border-r rounded-r-none md:rounded-r-md px-[10px] sm:px-[16px]"
        >
          <Users />
        </Button>
      </SheetTrigger>
      <SheetContent onOpenAutoFocus={e => e.preventDefault()}>
        <SheetHeader className="mb-[20px]">
          <SheetTitle>{t[lng].realTimePlayersScoreboardMenu.title}</SheetTitle>
          <SheetDescription>
            {t[lng].realTimePlayersScoreboardMenu.description}
          </SheetDescription>
        </SheetHeader>
        <PlayersScoreboard playersWithOptionalTies={groupedPlayers} rawTable />
      </SheetContent>
    </Sheet>
  );
}
