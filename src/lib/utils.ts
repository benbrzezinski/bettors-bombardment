import { MATH_OPERATIONS } from "@/data/color-effects";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const calculate = (
  a: number,
  b: number,
  operation: MATH_OPERATIONS | null
) => {
  switch (operation) {
    case MATH_OPERATIONS.Addition:
      return a + b;

    case MATH_OPERATIONS.Subtraction:
      return a - b;

    case MATH_OPERATIONS.Multiplication:
      return a * b;

    case MATH_OPERATIONS.Division:
      return a / b;

    default:
      return 0;
  }
};
