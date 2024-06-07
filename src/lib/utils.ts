import { MATH_OPERATIONS } from "@/data/color-effects";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Player } from "@/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const calculate = (a: number, b: number, operation: MATH_OPERATIONS) => {
  switch (operation) {
    case MATH_OPERATIONS.Addition:
      return a + b;

    case MATH_OPERATIONS.Subtraction:
      return a - b;

    case MATH_OPERATIONS.Multiplication:
      return a * b;

    case MATH_OPERATIONS.Division:
      return a / b;
  }
};

interface PlayersWithOptionalTies {
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
