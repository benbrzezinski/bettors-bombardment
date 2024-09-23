"use client";

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { ABILITIES, GAME_MODES } from "@/constants";
import useStore, { type Player } from "@/store";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

interface GameplayActionBtnProps {
  player: Player;
  betMade: boolean;
  setForceRender: Dispatch<SetStateAction<number>>;
  nextPlayerExists: (skipLevel?: number) => Player | undefined;
}

export default function GameplayActionBtn({
  player,
  betMade,
  setForceRender,
  nextPlayerExists,
}: GameplayActionBtnProps) {
  const {
    players,
    amountOfRounds,
    currentRound,
    gameMode,
    nextRound,
    deletePlayerAbilityInUse,
  } = useStore();
  const { lng } = useTranslation();
  const router = useRouter();

  if (
    (gameMode === GAME_MODES[1] || gameMode === GAME_MODES[2]) &&
    player.abilitiesInUse?.includes(ABILITIES[2])
  ) {
    const playerAfterNextPlayer = nextPlayerExists(2);
    const currentPlayerIndex = players.findIndex(p => p.id === player.id);
    const lastPlayerIndex = players.length - 1;
    const nextRoundPlayerIndex = currentPlayerIndex === lastPlayerIndex ? 1 : 0;

    const handleNavigation = (path: string) => {
      deletePlayerAbilityInUse(player.id, ABILITIES[2]);
      router.replace(path);
    };

    return playerAfterNextPlayer ? (
      <Button
        disabled={!betMade || player.value === 0}
        onClick={() => {
          handleNavigation(`/gameplay/${playerAfterNextPlayer.id}`);
        }}
      >
        {t[lng].gameplayActionBtn.nextBettor}
      </Button>
    ) : amountOfRounds > currentRound && players.length > 1 ? (
      <Button
        disabled={!betMade || player.value === 0}
        onClick={() => {
          nextRound();
          handleNavigation(`/gameplay/${players[nextRoundPlayerIndex].id}`);
          if (players.length === 2) setForceRender(prev => prev + 1);
        }}
      >
        {t[lng].gameplayActionBtn.nextRound}
      </Button>
    ) : (
      <Button
        disabled={!betMade || player.value === 0}
        onClick={() => {
          handleNavigation("/results");
        }}
      >
        {t[lng].gameplayActionBtn.seeResults}
      </Button>
    );
  }

  const nextPlayer = nextPlayerExists();

  return nextPlayer ? (
    <Button
      disabled={!betMade || player.value === 0}
      onClick={() => router.replace(`/gameplay/${nextPlayer.id}`)}
    >
      {t[lng].gameplayActionBtn.nextBettor}
    </Button>
  ) : amountOfRounds > currentRound && players.length > 1 ? (
    <Button
      disabled={!betMade || player.value === 0}
      onClick={() => {
        nextRound();
        router.replace(`/gameplay/${players[0].id}`);
      }}
    >
      {t[lng].gameplayActionBtn.nextRound}
    </Button>
  ) : (
    <Button
      disabled={!betMade || player.value === 0}
      onClick={() => router.replace("/results")}
    >
      {t[lng].gameplayActionBtn.seeResults}
    </Button>
  );
}
