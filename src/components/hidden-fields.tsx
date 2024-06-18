"use client";

import { Dispatch, MouseEvent, SetStateAction } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn, covertLargerNumberIntoSimplerForm } from "@/lib/utils";
import { colorEffects } from "@/data/color-effects";
import useStore, { type Player } from "@/store";
import { ABILITIES, GAME_MODES, type Color } from "@/constants";

interface HiddenFieldsProps {
  magicColors: Color[];
  betValue: string;
  betSubmitted: boolean;
  betMade: boolean;
  player: Player;
  setBetValue: Dispatch<SetStateAction<string>>;
  setBetMade: Dispatch<SetStateAction<boolean>>;
}

export default function HiddenFields({
  magicColors,
  betValue,
  betSubmitted,
  betMade,
  player,
  setBetValue,
  setBetMade,
}: HiddenFieldsProps) {
  const {
    currentRound,
    gameMode,
    updatePlayerBalance,
    deletePlayerAbilityInUse,
  } = useStore();

  const selectingField =
    (color: Color) => (e: MouseEvent<HTMLButtonElement>) => {
      if (betMade) return;

      const betValueParsed = parseInt(betValue);

      if (
        !betSubmitted ||
        isNaN(betValueParsed) ||
        betValueParsed > player.value ||
        betValueParsed < 1
      ) {
        toast({
          duration: 10000,
          variant: "destructive",
          title: "Uh, something went wrong!",
          description: `Submit the amount you want to bet, remember that the bet value must be within the range of your balance: ${player.value}$.`,
        });

        return;
      }

      const btn = e.currentTarget;
      const btnStyle = `border:none; color:black; font-size:14px; font-weight:700; background-color:${color}; box-shadow: 0px 0px 10px 0px ${color}; transform:scale(1.2);`;
      const colorEffect = colorEffects[color];
      const operation = colorEffect.operation;
      let effectValue = colorEffect.value * currentRound;

      if (
        gameMode === GAME_MODES[1] &&
        player.abilitiesInUse?.includes(ABILITIES[0])
      ) {
        effectValue *= 10;
        deletePlayerAbilityInUse(player.id, ABILITIES[0]);
      }

      btn.setAttribute("style", btnStyle);
      btn.innerText = `${operation ?? ""}${covertLargerNumberIntoSimplerForm(
        effectValue
      )}`;

      updatePlayerBalance(player.id, betValueParsed, effectValue, operation);
      setBetMade(true);
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
