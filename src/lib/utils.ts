import { MATH_OPERATIONS } from "@/data/color-effects";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import type { Player } from "@/store";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const calculateBalance = (
  betValue: number,
  effectValue: number,
  operation: MATH_OPERATIONS
) => {
  switch (operation) {
    case MATH_OPERATIONS.Addition:
      return betValue + effectValue;

    case MATH_OPERATIONS.Subtraction:
      return betValue - effectValue;

    case MATH_OPERATIONS.Multiplication:
      return betValue * effectValue;

    case MATH_OPERATIONS.Division:
      return betValue / effectValue;
  }
};

export interface PlayersWithOptionalTies {
  players: Player[];
}

export const groupPlayersIfTheyAreTied = (sortedPlayers: Player[]) => {
  const result: PlayersWithOptionalTies[] = [];
  let currentGroup: PlayersWithOptionalTies | null = null;

  for (let i = 0; i < sortedPlayers.length; i++) {
    const currentPlayer = sortedPlayers[i];
    const previousPlayer = sortedPlayers[i - 1];

    if (
      currentPlayer &&
      previousPlayer &&
      currentPlayer.value === previousPlayer.value &&
      currentGroup
    ) {
      currentGroup.players.push({ ...currentPlayer, value: 0 });
    } else {
      if (currentGroup) {
        result.push(currentGroup);
      }

      currentGroup = { players: [{ ...currentPlayer }] };
    }
  }

  if (currentGroup) {
    result.push(currentGroup);
  }

  return result;
};

export const covertLargerNumberIntoSimplerForm = (n: number) => {
  if (n >= 1000) {
    return `${n / 1000}K`;
  }

  return n;
};
