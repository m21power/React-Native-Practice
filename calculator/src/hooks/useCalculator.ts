import { useState } from "react";
import { calculate } from "../utils/calculator";
import type { Operator } from "../types/calculator";

export function useCalculator() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [shouldReset, setShouldReset] = useState(false);
  const [expression, setExpression] = useState("");

  function enterDigit(digit: string) {
    if (shouldReset || display === "0" || display === "Error") {
      setDisplay(digit);
      setShouldReset(false);
    } else if (display.replace("-", "").length < 12) {
      setDisplay(display + digit);
    }
  }

  function enterDecimal() {
    if (shouldReset || display === "Error") {
      setDisplay("0.");
      setShouldReset(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function selectOperator(nextOperator: Operator) {
    const current = Number(display);

    if (operator !== null && firstNumber !== null && !shouldReset) {
      try {
        const result = calculate(firstNumber, current, operator);
        setFirstNumber(result);
        setDisplay(String(result));
        setExpression(`${result} ${nextOperator}`);
      } catch {
        setDisplay("Error");
        setOperator(null);
        setFirstNumber(null);
        setShouldReset(true);
        return;
      }
    } else {
      setFirstNumber(current);
      setExpression(`${display} ${nextOperator}`);
    }

    setOperator(nextOperator);
    setShouldReset(true);
  }

  function performCalculation() {
    if (operator === null || firstNumber === null) return;

    const secondNumber = Number(display);

    try {
      const result = calculate(firstNumber, secondNumber, operator);

      setExpression(`${firstNumber} ${operator} ${secondNumber} =`);
      setDisplay(String(result));
      setFirstNumber(null);
      setOperator(null);
      setShouldReset(true);
    } catch {
      setDisplay("Error");
      setFirstNumber(null);
      setOperator(null);
      setShouldReset(true);
    }
  }

  function clear() {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setShouldReset(false);
    setExpression("");
  }

  function deleteDigit() {
    if (shouldReset || display === "Error") {
      setDisplay("0");
      setShouldReset(false);
      return;
    }

    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  }

  function toggleSign() {
    if (display !== "0" && display !== "Error") {
      setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
    }
  }

  function percentage() {
    if (display === "Error") return;
    setDisplay(String(Number(display) / 100));
    setShouldReset(true);
  }

  function handleButton(label: string) {
    if (/^[0-9]$/.test(label)) {
      enterDigit(label);
      return;
    }

    switch (label) {
      case ".":
        enterDecimal();
        break;
      case "C":
        clear();
        break;
      case "⌫":
        deleteDigit();
        break;
      case "+/-":
        toggleSign();
        break;
      case "%":
        percentage();
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        selectOperator(label);
        break;
      case "=":
        performCalculation();
        break;
    }
  }

  return {
    display,
    expression,
    handleButton,
  };
}
