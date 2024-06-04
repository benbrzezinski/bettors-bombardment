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
  crimson: { value: 0, operation: null }, // Set money to 0
  green: { value: 10, operation: MATH_OPERATIONS.Multiplication }, // Multiply money by 10
  hotpink: { value: 2, operation: MATH_OPERATIONS.Division }, // Divide money by 2
  blue: { value: 500, operation: MATH_OPERATIONS.Addition }, // Add 500 to money
  khaki: { value: 200, operation: MATH_OPERATIONS.Subtraction }, // Subtract 200 from money
  darkorange: { value: 5, operation: MATH_OPERATIONS.Multiplication }, // Multiply money by 5
  lightcoral: { value: 300, operation: MATH_OPERATIONS.Addition }, // Add 300 to money
  skyblue: { value: 4, operation: MATH_OPERATIONS.Multiplication }, // Multiply money by 4
  turquoise: { value: 3, operation: MATH_OPERATIONS.Division }, // Divide money by 3
  indigo: { value: 400, operation: MATH_OPERATIONS.Subtraction }, // Subtract 400 from money
  darkcyan: { value: 1000, operation: MATH_OPERATIONS.Addition }, // Add 1000 to money
  darkslategray: { value: 750, operation: MATH_OPERATIONS.Addition }, // Add 750 to money
  saddlebrown: { value: 100, operation: MATH_OPERATIONS.Subtraction }, // Subtract 100 from money
  blueviolet: { value: 3, operation: MATH_OPERATIONS.Multiplication }, // Multiply money by 8
  peachpuff: { value: 600, operation: MATH_OPERATIONS.Addition }, // Add 600 to money
  plum: { value: 2, operation: MATH_OPERATIONS.Multiplication }, // Multiply money by 2
  olive: { value: 50, operation: MATH_OPERATIONS.Subtraction }, // Subtract 50 from money
  purple: { value: 10, operation: MATH_OPERATIONS.Division }, // Divide money by 10
  goldenrod: { value: 2000, operation: MATH_OPERATIONS.Addition }, // Add 2000 to money
  midnightblue: { value: 5, operation: MATH_OPERATIONS.Division }, // Divide money by 5
};
