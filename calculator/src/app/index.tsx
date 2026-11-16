import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CalcButton from "../components/calcButton";
import { BUTTON_ROWS } from "../constants/calculatorButtons";
import { useCalculator } from "../hooks/useCalculator";
import type { ButtonTone } from "../types/calculator";
import { styles } from "./index.styles";
export default function CalculatorScreen() {
  const { display, expression, handleButton } = useCalculator();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>CALCULATOR</Text>
        <Text style={styles.subtitle}>Simple & powerful</Text>
      </View>

      <View style={styles.displayContainer}>
        <Text style={styles.expression} numberOfLines={1}>
          {expression}
        </Text>

        <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      <View style={styles.keypad}>
        {BUTTON_ROWS.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.labels.map((label) => {
              const isOperator = ["÷", "×", "-", "+"].includes(label);

              const tone: ButtonTone =
                label === "="
                  ? "equals"
                  : isOperator
                    ? "operator"
                    : row.tone === "utility"
                      ? "utility"
                      : "number";

              return (
                <CalcButton
                  key={label}
                  label={label}
                  tone={tone}
                  wide={label === "0"}
                  onPress={() => handleButton(label)}
                />
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
