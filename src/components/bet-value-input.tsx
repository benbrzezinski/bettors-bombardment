"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

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
  const submittingBet = () => {
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
        description: `Set the amount you want to bet, remember that the bet value must be within the range of your balance: ${playerValue}$.`,
      });

      return;
    }

    setBetSubmitted(true);
  };

  const resettingBet = () => {
    setBetValue("");
    setBetSubmitted(false);
  };

  return (
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
          onClick={submittingBet}
        >
          Submit
        </Button>
        <Button
          variant="secondary"
          disabled={betSubmitted || betMade}
          onClick={() => setBetValue(playerValue.toString())}
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
  );
}
