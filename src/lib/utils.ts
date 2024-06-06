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

export const groupPlayersIfTheyAreTied = (players: Player[]) => {
  let result: PlayersWithOptionalTies[] = [];

  for (let i = 0; i < players.length; i++) {
    const currentPlayer = players[i];
    const previousPlayer = players[i - 1];

    if (
      currentPlayer &&
      previousPlayer &&
      currentPlayer.value === previousPlayer.value
    ) {
      result[i - 1].players.push(currentPlayer);
    }

    if (currentPlayer && currentPlayer.value !== previousPlayer?.value) {
      result[result.length] = { players: [currentPlayer] };
    }
  }

  return result;
};
