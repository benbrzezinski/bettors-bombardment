"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import useStore from "@/store";
import useColorEffects from "@/hooks/use-color-effects";
import GameInfo from "@/components/game-info";
import BetValueInput from "@/components/bet-value-input";
import Multiplier from "@/components/multiplier";
import HiddenFields from "@/components/hidden-fields";
import GameplayActionBtn from "@/components/gameplay-action-btn";
import AbilitiesMenu from "@/components/abilities-menu";
import DefeatPopupMessage from "@/components/defeat-popup-message";
import RealTimePlayersScoreboardMenu from "@/components/real-time-players-scoreboard-menu";
import QuitBtn from "@/components/quit-btn";
import PlayerNotFound from "@/components/player-not-found";

interface GameplayDetailsProps {
  params: {
    id: string;
  };
}

export default function GameplayDetails({ params }: GameplayDetailsProps) {
  const [betValue, setBetValue] = useState("");
  const [betSubmitted, setBetSubmitted] = useState(false);
  const [betMade, setBetMade] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  const { players } = useStore();
  const { magicColors, generateRandomizedColors } = useColorEffects();

  const player = players.find(p => p.id === params.id);

  useEffect(() => {
    generateRandomizedColors();
  }, [generateRandomizedColors, forceRender]);

  useEffect(() => {
    setBetValue("");
    setBetSubmitted(false);
    setBetMade(false);
  }, [forceRender]);

  const nextPlayerExists = (skipLevel = 1) => {
    const currentPlayerIndex = players.findIndex(p => p.id === params.id);

    if (currentPlayerIndex !== -1) {
      return players.at(currentPlayerIndex + skipLevel);
    }
  };

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
          <div className="relative">
            <Multiplier />
            <HiddenFields
              key={forceRender}
              magicColors={magicColors}
              betValue={betValue}
              betSubmitted={betSubmitted}
              betMade={betMade}
              player={player}
              setBetValue={setBetValue}
              setBetSubmitted={setBetSubmitted}
              setBetMade={setBetMade}
            />
          </div>
        ) : (
          <Skeleton className="w-[290px] h-[1190px] sm:size-[590px] rounded-md" />
        )}
        <GameplayActionBtn
          player={player}
          betMade={betMade}
          setForceRender={setForceRender}
          nextPlayerExists={nextPlayerExists}
        />
      </div>
      <AbilitiesMenu player={player} betMade={betMade} />
      <RealTimePlayersScoreboardMenu />
      <DefeatPopupMessage player={player} nextPlayerExists={nextPlayerExists} />
      <QuitBtn />
    </>
  ) : (
    <PlayerNotFound />
  );
}
