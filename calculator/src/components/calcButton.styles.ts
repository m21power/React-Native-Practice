import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  wideButton: {
    flex: 1,
  },
  number: {
    backgroundColor: "#25262B",
  },
  utility: {
    backgroundColor: "#41434A",
  },
  operator: {
    backgroundColor: "#25262B",
    borderWidth: 1,
    borderColor: "#FF9F43",
  },
  equals: {
    backgroundColor: "#FF9F43",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "600",
  },
  operatorText: {
    color: "#FF9F43",
  },
  pressed: {
    opacity: 0.55,
  },
});
