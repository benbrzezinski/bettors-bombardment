"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import useStore from "@/store";
import useColorEffects from "@/hooks/use-color-effects";
import { type Color, colorEffects } from "@/data/color-effects";
import { type Player } from "@/store";
import { cn, covertLargerNumberIntoSimplerForm } from "@/lib/utils";
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
    deletePlayer,
    resetStore,
  } = useStore();
  const { magicColors, generateRandomColors } = useColorEffects();
  const router = useRouter();
  const alertTriggerBtnRef = useRef<HTMLButtonElement | null>(null);

  const nextPlayerExists = () => {
    const i = players.findIndex(p => p.id === params.id);

    if (i !== -1) {
      return players[i + 1];
    }
  };

  const player = players.find(p => p.id === params.id);
  const nextPlayer = nextPlayerExists();

  useEffect(() => {
    generateRandomColors();
  }, [generateRandomColors]);

  useEffect(() => {
    if (player && player.value === 0 && alertTriggerBtnRef.current) {
      const triggerBtn = alertTriggerBtnRef.current;

      const timeoutID = setTimeout(() => {
        triggerBtn.click();
      }, 1000);

      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [player, player?.value]);

  const getBalanceInRealTime = (playerValue: number) => {
    if (betValue.startsWith("0")) return `${playerValue}$`;
    const balance = playerValue - Number(betValue);
    return balance < 0 ? "Too much bet" : `${balance}$`;
  };

  const submittingBet = (playerValue: number) => {
    const betValueParsed = parseInt(betValue);

    if (
      betValue.startsWith("0") ||
      isNaN(betValueParsed) ||
      betValueParsed > playerValue ||
      betValueParsed < 1
    ) {
      toast({
        duration: 10000,
        variant: "destructive",
        title: "Uh, something went wrong!",
        description: `Set the amount you want to bet, remember that the bet value must be within the range of your balance: ${playerValue}$`,
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
    (currentPlayer: Player, color: Color) =>
    (e: MouseEvent<HTMLButtonElement>) => {
      if (betMade) return;

      const betValueParsed = parseInt(betValue);

      if (
        !betSubmitted ||
        isNaN(betValueParsed) ||
        betValueParsed > currentPlayer.value ||
        betValueParsed < 1
      ) {
        toast({
          duration: 10000,
          variant: "destructive",
          title: "Uh, something went wrong!",
          description: `Submit the amount you want to bet, remember that the bet value must be within the range of your balance: ${currentPlayer.value}$`,
        });

        return;
      }

      const btn = e.currentTarget;
      const btnStyles = `border:none; color:black; font-size:14px; font-weight:700; background-color:${color}; box-shadow: 0px 0px 10px 0px ${color}; transform:scale(1.2);`;
      const colorEffect = colorEffects[color];
      const valueWithMultiplier = colorEffect.value * currentRound;
      const operation = colorEffect.operation;

      btn.setAttribute("style", btnStyles);
      btn.innerText = `${
        colorEffect.operation ?? ""
      }${covertLargerNumberIntoSimplerForm(valueWithMultiplier)}`;

      setBetMade(true);
      updatePlayer(
        currentPlayer.id,
        betValueParsed,
        valueWithMultiplier,
        operation
      );
      setBetValue("");
    };

  const restartGame = () => {
    resetStore();
    router.replace("/");
  };

  return player ? (
    <div className="flex flex-col items-center gap-[50px]">
      <p className="font-bold text-4xl">Round {currentRound}</p>
      <div className="text-2xl text-center select-none break-all">
        <p>Bettor: {player.name}</p>
        <p>Balance: {getBalanceInRealTime(player.value)}</p>
      </div>
      <div className="flex flex-col items-center gap-[15px] w-full">
        <Input
          name="bet-value"
          type="text"
          placeholder="Value to bet"
          className="max-w-[500px]"
          value={betValue}
          disabled={betSubmitted || betMade}
          onChange={e => {
            const value = e.target.value;
            if (value !== "" && !/^\d+$/.test(value)) return;
            setBetValue(value);
          }}
        />
        <div className="flex items-center gap-[10px]">
          <Button
            variant="secondary"
            disabled={betSubmitted || betMade}
            onClick={() => submittingBet(player.value)}
          >
            Submit
          </Button>
          <Button
            variant="secondary"
            disabled={betSubmitted || betMade}
            onClick={() => setBetValue(player.value.toString())}
          >
            Max
          </Button>
          <Button
            variant="outline"
            disabled={!betSubmitted || betMade}
            onClick={resettingBet}
          >
            Reset
          </Button>
        </div>
      </div>
      {magicColors.length > 0 ? (
        <div className="relative">
          <HoverCard openDelay={150}>
            <HoverCardTrigger asChild>
              <p
                className="absolute top-[-45px] right-[-15px] md:right-[-42px] text-3xl font-bold text-red-700 cursor-pointer"
                tabIndex={0}
              >
                {currentRound}x
              </p>
            </HoverCardTrigger>
            <HoverCardContent>
              Multiplier that applies to all drawn numbers in this round.
            </HoverCardContent>
          </HoverCard>
          <div className="absolute top-[-8px] right-[-8px] size-[50px] border-t-2 border-r-2 border-red-700 rounded-tr-md pointer-events-none"></div>
          <ul
            className={cn(
              "grid grid-cols-5 sm:grid-cols-10 place-items-center gap-[10px] select-none",
              betMade && "pointer-events-none"
            )}
          >
            {magicColors.map((color, i) => (
              <li key={i} className="size-[50px]">
                <button
                  className="size-full border border-white rounded-md grid place-items-center cursor-pointer transition-[transform,background-color] hover:bg-secondary"
                  type="button"
                  onClick={selectingField(player, color)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Skeleton className="w-[290px] h-[1190px] sm:size-[590px] rounded-md" />
      )}
      {nextPlayer ? (
        <Button
          disabled={!betMade || player.value === 0}
          onClick={() => router.replace(`/game/${nextPlayer.id}`)}
        >
          Next Bettor
        </Button>
      ) : amountOfRounds > currentRound && players.length > 1 ? (
        <Button
          disabled={!betMade || player.value === 0}
          onClick={() => {
            nextRound();
            router.replace(`/game/${players[0].id}`);
          }}
        >
          Next Round
        </Button>
      ) : (
        <Button
          disabled={!betMade || player.value === 0}
          onClick={() => router.replace("/results")}
        >
          See Results
        </Button>
      )}
      <AlertDialog>
        <AlertDialogTrigger
          className="hidden absolute"
          ref={alertTriggerBtnRef}
        ></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive text-2xl">
              You have just lost!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your balance has been cleared. You have been removed from the game
              and you can no longer participate in this game, continue by
              clicking the button below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                deletePlayer(player.id);

                nextPlayer
                  ? router.replace(`/game/${nextPlayer.id}`)
                  : amountOfRounds > currentRound && players.length > 1
                  ? router.replace(`/game/${players[0].id}`)
                  : router.replace("/results");
              }}
            >
              <ChevronRight />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
      <Button onClick={restartGame}>Restart</Button>
    </div>
  );
}
