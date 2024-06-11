"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useStore, { type Player } from "@/store";

interface GameplayActionBtnProps {
  nextPlayer: Player | undefined;
  playerValue: number;
  betMade: boolean;
}

export default function GameplayActionBtn({
  nextPlayer,
  playerValue,
  betMade,
}: GameplayActionBtnProps) {
  const { players, amountOfRounds, currentRound, nextRound } = useStore();
  const router = useRouter();

  return nextPlayer ? (
    <Button
      disabled={!betMade || playerValue === 0}
      onClick={() => router.replace(`/gameplay/${nextPlayer.id}`)}
    >
      Next Bettor
    </Button>
  ) : amountOfRounds > currentRound && players.length > 1 ? (
    <Button
      disabled={!betMade || playerValue === 0}
      onClick={() => {
        nextRound();
        router.replace(`/gameplay/${players[0].id}`);
      }}
    >
      Next Round
    </Button>
  ) : (
    <Button
      disabled={!betMade || playerValue === 0}
      onClick={() => router.replace("/results")}
    >
      See Results
    </Button>
  );
}
