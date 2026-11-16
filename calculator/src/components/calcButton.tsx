import { Pressable, Text, StyleSheet } from "react-native";
import type { ButtonTone } from "../types/calculator";
import { styles } from "./calcButton.styles";

type Props = {
  label: string;
  onPress: () => void;
  tone?: ButtonTone;
  wide?: boolean;
};

export default function CalcButton({
  label,
  onPress,
  tone = "number",
  wide = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[tone],
        wide && styles.wideButton,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[styles.buttonText, tone === "operator" && styles.operatorText]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
