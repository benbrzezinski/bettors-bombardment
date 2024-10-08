"use client";

import { Dispatch, MouseEvent, SetStateAction, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn, covertLargerNumberIntoSimplerForm } from "@/lib/utils";
import { colorEffects } from "@/data/color-effects";
import { ABILITIES, GAME_MODES, LANGUAGES, type Color } from "@/constants";
import useStore, { type Player } from "@/store";
import useAbilities from "@/hooks/use-abilities";
import useTranslation from "@/store/use-translation";

interface HiddenFieldsProps {
  colors: Color[];
  betValue: string;
  betSubmitted: boolean;
  betMade: boolean;
  player: Player;
  setBetValue: Dispatch<SetStateAction<string>>;
  setBetSubmitted: Dispatch<SetStateAction<boolean>>;
  setBetMade: Dispatch<SetStateAction<boolean>>;
}

export default function HiddenFields({
  colors,
  betValue,
  betSubmitted,
  betMade,
  player,
  setBetValue,
  setBetSubmitted,
  setBetMade,
}: HiddenFieldsProps) {
  const {
    currentRound,
    gameMode,
    updatePlayerBalance,
    deletePlayerAbilityInUse,
  } = useStore();
  const { runSneakPeek } = useAbilities();
  const { lng } = useTranslation();
  const betValueRef = useRef<string | null>(null);
  const betMadeRef = useRef(false);

  const selectField = (
    e: MouseEvent<HTMLButtonElement>,
    color: Color,
    isRepetitive = false
  ) => {
    if (betMade || betMadeRef.current) return;

    const betValueParsed = betValueRef.current
      ? parseInt(betValueRef.current)
      : parseInt(betValue);

    if (
      !betSubmitted ||
      isNaN(betValueParsed) ||
      betValueParsed > player.value ||
      betValueParsed < 1
    ) {
      if (lng === LANGUAGES[0]) {
        toast({
          duration: 10000,
          variant: "destructive",
          title: "Uh, something went wrong!",
          description: `Submit the amount you want to bet, remember that the bet value must be within the range of your balance: ${player.value}$.`,
        });
      } else {
        toast({
          duration: 10000,
          variant: "destructive",
          title: "Oj, coś poszło nie tak!",
          description: `Zatwierdź kwotę, którą chcesz postawić, pamiętaj, że wartość zakładu musi mieścić się w zakresie twojego salda: ${player.value}$.`,
        });
      }

      return;
    }

    const btn = e.currentTarget;
    const btnStyle = `border:none; color:black; font-size:14px; font-weight:700; background-color:${color}; box-shadow: 0px 0px 10px 0px ${color}; transform:scale(1.2);`;
    const { value, operation } = colorEffects[color];
    let effectValue = value * currentRound;

    if (
      (gameMode === GAME_MODES[1] || gameMode === GAME_MODES[2]) &&
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

    if (
      (gameMode === GAME_MODES[1] || gameMode === GAME_MODES[2]) &&
      player.abilitiesInUse?.includes(ABILITIES[1])
    ) {
      deletePlayerAbilityInUse(player.id, ABILITIES[1]);
    }

    if (isRepetitive && player.value > 0) {
      if (betValueParsed > player.value) {
        setBetValue(player.value.toString());
        betValueRef.current = player.value.toString();
      }

      return;
    }

    setBetValue("");
    setBetSubmitted(false);
    setBetMade(true);
    betMadeRef.current = true;
  };

  const handleClickField =
    (color: Color) => (e: MouseEvent<HTMLButtonElement>) => {
      if (gameMode === GAME_MODES[1] || gameMode === GAME_MODES[2]) {
        if (player.abilitiesInUse?.includes(ABILITIES[6])) {
          runSneakPeek(player.id, e, color);
          return;
        }

        if (player.abilitiesInUse?.includes(ABILITIES[4])) {
          selectField(e, color, true);
          deletePlayerAbilityInUse(player.id, ABILITIES[4]);
        }
      }

      selectField(e, color);
    };

  return (
    <ul
      className={cn(
        "grid grid-cols-5 sm:grid-cols-10 place-items-center gap-[10px] select-none",
        betMade && "pointer-events-none"
      )}
    >
      {colors.map((color, i) => (
        <li key={i}>
          <button
            type="button"
            className="size-[50px] border border-white rounded-md grid place-items-center transition-[transform,background-color] hover:bg-secondary focus-visible:bg-secondary"
            onClick={handleClickField(color)}
          >
            {i + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}
