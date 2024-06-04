"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import Lottie from "lottie-react";
import useStore from "@/store";
import useColorEffects from "@/hooks/use-color-effects";
import { type Color, colorEffects } from "@/data/color-effects";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import notFound from "@/lotties/not-found.json";

interface GameDetailsProps {
  params: {
    id: string;
  };
}

export default function GameDetails({ params }: GameDetailsProps) {
  const [betValue, setBetValue] = useState("");
  const [betSubmitted, setBetSubmitted] = useState(false);
  const [betMade, setBetMade] = useState(false);
  const {
    players,
    amountOfRounds,
    currentRound,
    nextRound,
    updatePlayer,
    removePlayer,
    resetStore,
  } = useStore();
  const { magicColors, generateRandomColors } = useColorEffects();
  const router = useRouter();

  const nextPlayerExists = () => {
    const index = players.findIndex(p => p.id === params.id);

    if (index !== -1) {
      return players[index + 1];
    }
  };

  const player = players.find(p => p.id === params.id);
  const round = currentRound + 1;
  const nextPlayer = nextPlayerExists();

  useEffect(() => {
    generateRandomColors();
  }, [generateRandomColors]);

  useEffect(() => {
    if (player && player.value <= 0) {
      removePlayer(player.id);

      nextPlayer
        ? router.replace(`/game/${nextPlayer.id}`)
        : amountOfRounds > round && players.length > 1
        ? router.replace(`/game/${players[0].id}`)
        : router.replace("/results");
    }
  }, [
    player,
    player?.value,
    removePlayer,
    nextPlayer,
    router,
    amountOfRounds,
    round,
    players,
  ]);

  const submittingBet = () => {
    const betValueParsed = parseInt(betValue);

    if (
      isNaN(betValueParsed) ||
      betValueParsed > player!.value ||
      betValueParsed < 1
    ) {
      toast({
        duration: 10000,
        variant: "destructive",
        title: "Uh, something went wrong!",
        description: `Set the amount you want to bet, remember that the bet value must be within the range of your balance: ${
          player!.value
        }$`,
      });

      return;
    }

    setBetSubmitted(true);
  };

  const resettingBet = () => {
    setBetValue("");
    setBetSubmitted(false);
  };

  const selectingField =
    (color: Color) => (e: MouseEvent<HTMLButtonElement>) => {
      if (betMade) return;

      const betValueParsed = parseInt(betValue);

      if (
        isNaN(betValueParsed) ||
        betValueParsed > player!.value ||
        betValueParsed < 1
      ) {
        toast({
          duration: 10000,
          variant: "destructive",
          title: "Uh, something went wrong!",
          description: `Set the amount you want to bet, remember that the bet value must be within the range of your balance: ${
            player!.value
          }$`,
        });

        return;
      }

      const btn = e.currentTarget;
      const btnStyles = `border:none; color:black; font-size:13px; font-weight:700; background-color:${color}; transform:scale(1.2);`;
      const colorEffect = colorEffects[color];

      btn.setAttribute("style", btnStyles);
      btn.innerText = `${colorEffect.operation ?? ""}${colorEffect.value}`;

      setBetMade(true);
      updatePlayer(
        player!.id,
        betValueParsed,
        colorEffect.value,
        colorEffect.operation
      );
    };

  return player ? (
    <div className="flex flex-col items-center gap-[50px]">
      <p className="font-bold text-4xl">Round {round}</p>
      <div className="text-2xl text-center select-none">
        <p>Bettor: {player.name}</p>
        <p>Balance: {player.value}$</p>
      </div>
      <div className="flex items-center gap-[10px] w-full max-w-[500px]">
        <Input
          name="bet-value"
          type="text"
          placeholder="Value to bet"
          value={betValue}
          disabled={betSubmitted || betMade}
          onChange={e => {
            const value = e.target.value;
            if (value !== "" && !/^\d+$/.test(value)) return;
            setBetValue(value);
          }}
        />
        <Button
          variant="secondary"
          disabled={betSubmitted || betMade}
          onClick={submittingBet}
        >
          Submit
        </Button>
        <Button
          variant="outline"
          disabled={!betSubmitted || betMade}
          onClick={resettingBet}
        >
          Reset
        </Button>
      </div>
      {magicColors.length > 0 ? (
        <ul
          className={cn(
            "grid grid-cols-5 sm:grid-cols-10 place-items-center gap-[10px] select-none",
            betMade && "pointer-events-none"
          )}
        >
          {magicColors.map((color, i) => (
            <li key={i} className="w-[50px] aspect-square">
              <button
                className="size-full border p-[2px] border-white rounded-md grid place-items-center cursor-pointer transition-[transform,background-color] hover:bg-secondary"
                type="button"
                onClick={selectingField(color)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <Skeleton className="w-[290px] h-[1190px] sm:size-[590px] rounded-md" />
      )}
      {nextPlayer ? (
        <Button
          disabled={!betMade}
          onClick={() => router.replace(`/game/${nextPlayer.id}`)}
        >
          Next Bettor
        </Button>
      ) : amountOfRounds > round && players.length > 1 ? (
        <Button
          disabled={!betMade}
          onClick={() => {
            nextRound();
            router.replace(`/game/${players[0].id}`);
          }}
        >
          Next Round
        </Button>
      ) : (
        <Button disabled={!betMade} onClick={() => router.replace("/results")}>
          See Results
        </Button>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center gap-[10px]">
      <p className="text-center">
        Player not found, please start the game again
      </p>
      <div className="size-[300px] relative">
        <Lottie
          animationData={notFound}
          loop={false}
          className="inset-0 absolute z-10"
        />
        <Skeleton className="size-[250px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full" />
      </div>
      <Button
        onClick={() => {
          resetStore();
          router.replace("/");
        }}
      >
        Restart
      </Button>
    </div>
  );
}
