import type { ButtonRow } from "../types/calculator";

export const BUTTON_ROWS: ButtonRow[] = [
  { labels: ["C", "+/-", "%", "÷"], tone: "utility" },
  { labels: ["7", "8", "9", "×"], tone: "number" },
  { labels: ["4", "5", "6", "-"], tone: "number" },
  { labels: ["1", "2", "3", "+"], tone: "number" },
  { labels: ["0", ".", "⌫", "="], tone: "number" },
];
