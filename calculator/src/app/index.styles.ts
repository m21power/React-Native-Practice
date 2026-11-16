import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101114",
    paddingHorizontal: 18,
  },
  header: {
    paddingTop: 16,
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: 3,
  },
  subtitle: {
    color: "#85868C",
    fontSize: 12,
    marginTop: 5,
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 30,
  },
  expression: {
    color: "#85868C",
    fontSize: 20,
    marginBottom: 12,
  },
  display: {
    color: "#FFFFFF",
    fontSize: 68,
    fontWeight: "300",
  },
  keypad: {
    flex: 2,
    gap: 12,
    paddingBottom: 12,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
});
