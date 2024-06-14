"use client";

import { Dispatch, MouseEvent, SetStateAction } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn, covertLargerNumberIntoSimplerForm } from "@/lib/utils";
import { colorEffects } from "@/data/color-effects";
import useStore, { type Player } from "@/store";
import type { Color } from "@/constants";

interface HiddenFieldsProps {
  magicColors: Color[];
  betValue: string;
  betSubmitted: boolean;
  betMade: boolean;
  currentPlayer: Player;
  setBetValue: Dispatch<SetStateAction<string>>;
  setBetMade: Dispatch<SetStateAction<boolean>>;
}

export default function HiddenFields({
  magicColors,
  betValue,
  betSubmitted,
  betMade,
  currentPlayer,
  setBetValue,
  setBetMade,
}: HiddenFieldsProps) {
  const { currentRound, updatePlayerBalance } = useStore();

  const selectingField =
    (color: Color) => (e: MouseEvent<HTMLButtonElement>) => {
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
          description: `Submit the amount you want to bet, remember that the bet value must be within the range of your balance: ${currentPlayer.value}$.`,
        });

        return;
      }

      const btn = e.currentTarget;
      const btnStyles = `border:none; color:black; font-size:14px; font-weight:700; background-color:${color}; box-shadow: 0px 0px 10px 0px ${color}; transform:scale(1.2);`;
      const colorEffect = colorEffects[color];
      const effectValueWithMultiplier = colorEffect.value * currentRound;
      const operation = colorEffect.operation;

      btn.setAttribute("style", btnStyles);
      btn.innerText = `${operation ?? ""}${covertLargerNumberIntoSimplerForm(
        effectValueWithMultiplier
      )}`;

      setBetMade(true);
      updatePlayerBalance(
        currentPlayer.id,
        betValueParsed,
        effectValueWithMultiplier,
        operation
      );
      setBetValue("");
    };

  return (
    <ul
      className={cn(
        "grid grid-cols-5 sm:grid-cols-10 place-items-center gap-[10px] select-none",
        betMade && "pointer-events-none"
      )}
    >
      {magicColors.map((color, i) => (
        <li key={i}>
          <button
            type="button"
            className="size-[50px] border border-white rounded-md grid place-items-center transition-[transform,background-color] hover:bg-secondary focus-visible:bg-secondary"
            onClick={selectingField(color)}
          >
            {i + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}
