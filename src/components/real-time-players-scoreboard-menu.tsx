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
import { Menu } from "lucide-react";
import PlayersScoreboard from "@/components/players-scoreboard";
import { groupPlayersIfTheyAreTied } from "@/lib/utils";
import useStore from "@/store";

export default function RealTimePlayersScoreboardMenu() {
  const { players } = useStore();

  const sortedPlayers = [...players].sort((a, b) => b.value - a.value);
  const groupedPlayers = groupPlayersIfTheyAreTied(sortedPlayers);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="animate-fade-in opacity-0 pointer-events-none fixed top-[90%] md:top-[50%] translate-y-[-50%] right-[0px] md:right-[15px] 2xl:right-[30px] border-r-0 md:border-r rounded-r-none md:rounded-r-md"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-[20px]">
          <SheetTitle>Player&apos;s Scoreboard</SheetTitle>
          <SheetDescription>
            Shows the current status of the results. Updates are made in real
            time.
          </SheetDescription>
        </SheetHeader>
        <PlayersScoreboard playersWithOptionalTies={groupedPlayers} rawTable />
      </SheetContent>
    </Sheet>
  );
}
