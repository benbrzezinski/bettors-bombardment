"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { LANGUAGES } from "@/constants";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

interface BetValueInputProps {
  betValue: string;
  betSubmitted: boolean;
  betMade: boolean;
  playerValue: number;
  setBetValue: Dispatch<SetStateAction<string>>;
  setBetSubmitted: Dispatch<SetStateAction<boolean>>;
}

export default function BetValueInput({
  betValue,
  betSubmitted,
  betMade,
  playerValue,
  setBetValue,
  setBetSubmitted,
}: BetValueInputProps) {
  const { lng } = useTranslation();

  const submitBet = () => {
    const betValueParsed = parseInt(betValue);

    if (
      betValue.startsWith("0") ||
      isNaN(betValueParsed) ||
      betValueParsed > playerValue ||
      betValueParsed < 1
    ) {
      if (lng === LANGUAGES[0]) {
        toast({
          duration: 10000,
          variant: "destructive",
          title: "Uh, something went wrong!",
          description: `Set the amount you want to bet, remember that the bet value must be within the range of your balance: ${playerValue}$.`,
        });
      } else {
        toast({
          duration: 10000,
          variant: "destructive",
          title: "Oj, coś poszło nie tak!",
          description: `Ustaw kwotę, jaką chcesz postawić, pamiętaj, że wartość zakładu musi mieścić się w zakresie twojego salda: ${playerValue}$.`,
        });
      }

      return;
    }

    setBetSubmitted(true);
  };

  const resetBet = () => {
    setBetValue("");
    setBetSubmitted(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-[15px]">
      <Input
        type="text"
        name="bet-value"
        inputMode="numeric"
        placeholder={t[lng].betValueInput.placeholder}
        className="max-w-[500px] text-base"
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
          onClick={submitBet}
        >
          {t[lng].betValueInput.submit}
        </Button>
        <Button
          variant="secondary"
          disabled={betSubmitted || betMade}
          onClick={() => setBetValue(playerValue.toString())}
        >
          {t[lng].betValueInput.max}
        </Button>
        <Button
          variant="outline"
          disabled={!betSubmitted || betMade}
          onClick={resetBet}
        >
          {t[lng].betValueInput.reset}
        </Button>
      </div>
    </div>
  );
}
