"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import useColorEffects from "@/hooks/use-color-effects";
import GameInfo from "@/components/game-info";
import BetValueInput from "@/components/bet-value-input";
import Multiplier from "@/components/multiplier";
import HiddenFields from "@/components/hidden-fields";
import GameplayActionBtn from "@/components/gameplay-action-btn";
import DefeatPopupMessage from "@/components/defeat-popup-message";
import PlayerNotFound from "@/components/player-not-found";
import Abilities from "@/components/abilities";
import QuitBtn from "@/components/quit-btn";

interface GameplayDetailsProps {
  params: {
    id: string;
  };
}

export default function GameplayDetails({ params }: GameplayDetailsProps) {
  const [betValue, setBetValue] = useState("");
  const [betSubmitted, setBetSubmitted] = useState(false);
  const [betMade, setBetMade] = useState(false);
  const { players } = useStore();
  const { magicColors, generateRandomColors } = useColorEffects();

  useEffect(() => {
    generateRandomColors();
  }, [generateRandomColors]);

  const nextPlayerExists = () => {
    const i = players.findIndex(p => p.id === params.id);

    if (i !== -1) {
      return players[i + 1];
    }
  };

  const player = players.find(p => p.id === params.id);
  const nextPlayer = nextPlayerExists();

  return player ? (
    <>
      <div className="flex flex-col items-center gap-[50px]">
        <GameInfo player={player} betValue={betValue} />
        <BetValueInput
          betValue={betValue}
          betSubmitted={betSubmitted}
          betMade={betMade}
          playerValue={player.value}
          setBetValue={setBetValue}
          setBetSubmitted={setBetSubmitted}
        />
        {magicColors.length > 0 ? (
          <div className={cn("relative", player.abilities && "mt-[50px]")}>
            <Abilities abilities={player.abilities} />
            <Multiplier />
            <HiddenFields
              magicColors={magicColors}
              betValue={betValue}
              betSubmitted={betSubmitted}
              betMade={betMade}
              currentPlayer={player}
              setBetValue={setBetValue}
              setBetMade={setBetMade}
            />
          </div>
        ) : (
          <Skeleton className="w-[290px] h-[1190px] sm:size-[590px] rounded-md" />
        )}
        <GameplayActionBtn
          nextPlayer={nextPlayer}
          playerValue={player.value}
          betMade={betMade}
        />
      </div>
      <QuitBtn />
      <DefeatPopupMessage player={player} nextPlayer={nextPlayer} />
    </>
  ) : (
    <PlayerNotFound />
  );
}
