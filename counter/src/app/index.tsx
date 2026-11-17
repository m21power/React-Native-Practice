import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  decrement,
  getCount,
  increment,
  resetCount,
} from "../services/counterApi";
import { styles } from "./index.styles";
import { useCounter } from "../hooks/counter";
export default function HomeScreen() {
  const { display, loading, error, run } = useCounter();
  const isBusy = loading !== null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#090B2D", "#11104A", "#17105C"]}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>↗</Text>
          </View>

          <Text style={styles.title}>
            Counter <Text style={styles.titleAccent}>App</Text>
          </Text>

          <Text style={styles.subtitle}>
            Tap to increase or decrease the number
          </Text>
        </View>

        {/* Counter Display */}
        <View style={styles.counterCard}>
          {loading === "load" ? (
            <ActivityIndicator size="large" color="#9565FF" />
          ) : (
            <Text style={styles.counterValue}>{display}</Text>
          )}
          <Text style={styles.counterLabel}>CURRENT COUNT</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <View style={styles.actionItem}>
            <Pressable
              onPress={() => run("inc", increment)}
              disabled={isBusy}
              style={({ pressed }) => [
                styles.button,
                styles.increaseButton,
                pressed && styles.pressed,
                isBusy && loading !== "inc" && styles.disabled,
              ]}
            >
              <LinearGradient
                colors={["#874BFF", "#5721E8"]}
                style={styles.buttonGradient}
              >
                {loading === "inc" ? (
                  <ActivityIndicator size="large" color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>+</Text>
                )}
              </LinearGradient>
            </Pressable>
            <Text style={styles.actionLabel}>Increase</Text>
          </View>

          <View style={styles.actionItem}>
            <Pressable
              onPress={() => run("dec", decrement)}
              disabled={isBusy}
              style={({ pressed }) => [
                styles.button,
                styles.decreaseButton,
                pressed && styles.pressed,
                isBusy && loading !== "dec" && styles.disabled,
              ]}
            >
              <LinearGradient
                colors={["#FF6485", "#E92355"]}
                style={styles.buttonGradient}
              >
                {loading === "dec" ? (
                  <ActivityIndicator size="large" color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>−</Text>
                )}
              </LinearGradient>
            </Pressable>
            <Text style={styles.actionLabel}>Decrease</Text>
          </View>
        </View>

        {/* Reset Button */}
        <Pressable
          onPress={() => run("reset", resetCount)}
          disabled={isBusy}
          style={[
            styles.resetButton,
            isBusy && loading !== "reset" && styles.disabled,
          ]}
        >
          {loading === "reset" ? (
            <ActivityIndicator color="#C5B5FF" />
          ) : (
            <Text style={styles.resetText}>↻ Reset Counter</Text>
          )}
        </Pressable>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerIcon}>✦</Text>
          <Text style={styles.footerText}>Keep counting!</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
