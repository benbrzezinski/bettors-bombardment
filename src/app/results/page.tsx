"use client";

import Winners from "@/components/winners";
import PlayersScoreboard from "@/components/players-scoreboard";
import NewGameBtn from "@/components/new-game-btn";
import { groupPlayersIfTheyAreTied, cn } from "@/lib/utils";
import useStore from "@/store";

export default function Results() {
  const { players } = useStore();

  const sortedPlayers = [...players].sort((a, b) => b.value - a.value);
  const winners = sortedPlayers.filter(
    player => player.value === sortedPlayers.at(0)?.value
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
