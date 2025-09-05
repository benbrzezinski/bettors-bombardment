"use client";

import dynamic from "next/dynamic";
import PlayersScoreboard from "@/components/players-scoreboard";
import NewGameBtn from "@/components/new-game-btn";
import { groupPlayersIfTheyAreTied, cn, sortPlayers } from "@/lib/utils";
import useStore from "@/store";

const Winners = dynamic(() => import("@/components/winners"), {
  ssr: false,
});

export default function Results() {
  const { players } = useStore();

  const sortedPlayers = sortPlayers(players);

  const winners = sortedPlayers.filter(
    player => player.value === sortedPlayers[0].value
  );

  const remainingPlayers = groupPlayersIfTheyAreTied(
    sortedPlayers.slice(winners.length)
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-[100px]",
        winners.length === 0 && "gap-[50px]"
      )}
    >
      <Winners winners={winners} />
      <div className="flex flex-col items-center gap-[50px]">
        <PlayersScoreboard playersWithOptionalTies={remainingPlayers} />
        <NewGameBtn />
      </div>
    </div>
  );
}
