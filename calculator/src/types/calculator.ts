export type Operator = "+" | "-" | "×" | "÷";

export type ButtonTone = "number" | "utility" | "operator" | "equals";

export type ButtonRow = {
  labels: string[];
  tone: ButtonTone;
};
