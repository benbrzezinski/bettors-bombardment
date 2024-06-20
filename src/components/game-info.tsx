"use client";

import useStore, { type Player } from "@/store";

interface GameInfoProps {
  player: Player;
  betValue: string;
}

export default function GameInfo({ player, betValue }: GameInfoProps) {
  const { amountOfRounds, currentRound } = useStore();

  const getBalanceInRealTime = (playerValue: number) => {
    if (betValue.startsWith("0")) return `${playerValue}$`;
    const balance = playerValue - Number(betValue);
    return balance < 0 ? "Too much bet" : `${balance}$`;
  };

  return (
    <>
      <p className="font-bold text-4xl cursor-default">
        Round {currentRound}/{amountOfRounds}
      </p>
      <div className="text-2xl text-center break-all cursor-default">
        <p>Bettor: {player.name}</p>
        <p>Balance: {getBalanceInRealTime(player.value)}</p>
      </div>
    </>
  );
}
