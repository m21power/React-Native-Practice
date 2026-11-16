import type { Operator } from "../types/calculator";

export function calculate(
  first: number,
  second: number,
  operator: Operator,
): number {
  let result: number;

  switch (operator) {
    case "+":
      result = first + second;
      break;

    case "-":
      result = first - second;
      break;

    case "×":
      result = first * second;
      break;

    case "÷":
      if (second === 0) {
        throw new Error("Cannot divide by zero");
      }
      result = first / second;
      break;
  }

  if (!Number.isFinite(result)) {
    throw new Error("Invalid calculation");
  }

  return Number(result.toPrecision(12));
}
