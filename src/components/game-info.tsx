"use client";

import useStore, { type Player } from "@/store";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

interface GameInfoProps {
  player: Player;
  betValue: string;
}

export default function GameInfo({ player, betValue }: GameInfoProps) {
  const { amountOfRounds, currentRound } = useStore();
  const { lng } = useTranslation();

  const getBalanceInRealTime = (playerValue: number) => {
    if (betValue.startsWith("0")) return `${playerValue}$`;
    const balance = playerValue - Number(betValue);
    return balance < 0 ? t[lng].gameInfo.bet : `${balance}$`;
  };

  return (
    <>
      <p className="font-bold text-4xl cursor-default">
        {t[lng].gameInfo.round} {currentRound}/{amountOfRounds}
      </p>
      <div className="text-2xl text-center break-all cursor-default">
        <p>
          {t[lng].bettor}: {player.name}
        </p>
        <p>
          {t[lng].balance}: {getBalanceInRealTime(player.value)}
        </p>
      </div>
    </>
  );
}
