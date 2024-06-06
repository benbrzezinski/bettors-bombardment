export enum MATH_OPERATIONS {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "*",
  Division = "/",
}

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

interface ColorEffect {
  value: number;
  operation: MATH_OPERATIONS | null;
}

export const colorEffects: Record<Color, ColorEffect> = {
  crimson: { value: 0, operation: null },
  green: { value: 10, operation: MATH_OPERATIONS.Multiplication },
  hotpink: { value: 2, operation: MATH_OPERATIONS.Division },
  blue: { value: 9000, operation: MATH_OPERATIONS.Subtraction },
  khaki: { value: 1500, operation: MATH_OPERATIONS.Subtraction },
  darkorange: { value: 5, operation: MATH_OPERATIONS.Multiplication },
  lightcoral: { value: 8, operation: MATH_OPERATIONS.Multiplication },
  skyblue: { value: 4, operation: MATH_OPERATIONS.Multiplication },
  turquoise: { value: 3, operation: MATH_OPERATIONS.Division },
  indigo: { value: 4000, operation: MATH_OPERATIONS.Subtraction },
  darkcyan: { value: 4, operation: MATH_OPERATIONS.Division },
  darkslategray: { value: 75, operation: MATH_OPERATIONS.Addition },
  saddlebrown: { value: 7000, operation: MATH_OPERATIONS.Subtraction },
  blueviolet: { value: 3, operation: MATH_OPERATIONS.Multiplication },
  peachpuff: { value: 6000, operation: MATH_OPERATIONS.Addition },
  plum: { value: 2, operation: MATH_OPERATIONS.Multiplication },
  olive: { value: 50, operation: MATH_OPERATIONS.Subtraction },
  purple: { value: 10, operation: MATH_OPERATIONS.Division },
  goldenrod: { value: 2000, operation: MATH_OPERATIONS.Addition },
  midnightblue: { value: 5, operation: MATH_OPERATIONS.Division },
};
