"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import GameInfo from "@/components/game-info";
import BetValueInput from "@/components/bet-value-input";
import Multiplier from "@/components/multiplier";
import HiddenFields from "@/components/hidden-fields";
import GameplayActionBtn from "@/components/gameplay-action-btn";
import AbilitiesMenu from "@/components/abilities-menu";
import DefeatPopupMessage from "@/components/defeat-popup-message";
import RealTimePlayersScoreboardMenu from "@/components/real-time-players-scoreboard-menu";
import QuitBtn from "@/components/quit-btn";
import useStore from "@/store";
import useColors from "@/hooks/use-colors";

const PlayerNotFound = dynamic(() => import("@/components/player-not-found"), {
  ssr: false,
});

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
  const { colors, generateRandomizedColors } = useColors();

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
        {colors.length > 0 ? (
          <div className="relative">
            <Multiplier />
            <HiddenFields
              key={forceRender}
              colors={colors}
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
