export const NUMBER_OF_PLAYERS = [2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type NumberOfPlayers = (typeof NUMBER_OF_PLAYERS)[number];

export const AMOUNT_OF_ROUNDS = [3, 4, 5, 6, 7, 8, 9, 10] as const;
export type AmountOfRounds = (typeof AMOUNT_OF_ROUNDS)[number];

export const GAME_MODES = ["Normal", "Abilities"] as const;
export type GameMode = (typeof GAME_MODES)[number];

export const ABILITIES = [
  "testYourLuck",
  "secondChance",
  "skipNextPlayer",
  "luckThief",
  "doubleTrouble",
  "balanceEqualizer",
] as const;
export type Ability = (typeof ABILITIES)[number];

export const COLORS = [
  "crimson",
  "green",
  "hotpink",
  "darkorange",
  "khaki",
  "blueviolet",
  "indigo",
  "darkcyan",
  "skyblue",
  "blue",
  "saddlebrown",
  "goldenrod",
  "darkslategray",
  "turquoise",
  "olive",
  "peachpuff",
  "plum",
  "purple",
  "midnightblue",
  "lightcoral",
] as const;
export type Color = (typeof COLORS)[number];
