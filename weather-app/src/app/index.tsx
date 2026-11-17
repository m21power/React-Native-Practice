import CitySearch from "@/components/CitySearch";
import HourlyForecast from "@/components/HourlyForecast";
import WeatherGrid from "@/components/WeatherGrid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWeather } from "../hooks/weatherHooks";
import { c, styles } from "./index.styles";
type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

/* ---------------- Screen ---------------- */

export default function HomeScreen() {
  const {
    weatherData,
    city,
    searchCity,
    setSearchCity,
    loading,
    error,
    fetchWeather,
  } = useWeather();
  /* ---------------- Loading State ---------------- */

  if (loading && !weatherData) {
    return (
      <LinearGradient colors={[c.surface, c.surfaceLowest]} style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={c.primary} />
            <Text style={{ color: c.onSurface, marginTop: 12 }}>
              Loading weather...
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
  const weather = weatherData?.weather;
  const hourly = weatherData?.hourly ?? [];

  return (
    <LinearGradient colors={[c.surface, c.surfaceLowest]} style={styles.flex}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* City Search */}
          <CitySearch
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            fetchWeather={fetchWeather}
            loading={loading}
            error={error}
            weatherData={weatherData}
          />

          {/* Error Message */}
          {/* No Data */}
          {!weather && (
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <MaterialCommunityIcons
                name="weather-cloudy-alert"
                size={48}
                color={c.primary}
              />
              <Text style={{ color: c.onSurface, marginTop: 12 }}>
                No weather data available.
              </Text>
            </View>
          )}

          {weather && (
            <>
              {/* Location Header */}
              <View style={styles.header}>
                <View style={styles.locationPill}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={18}
                    color={c.primary}
                  />
                  <Text style={styles.city}>{weather.city}</Text>
                </View>

                <Text style={styles.country}>{weather.country}</Text>

                <View style={styles.datePill}>
                  <View style={styles.liveDot} />
                  <Text style={styles.dateText}>{weather.date}</Text>
                </View>
              </View>

              {/* Weather Art */}
              <View style={styles.hero}>
                <View
                  style={[
                    styles.glow,
                    {
                      top: -24,
                      width: 224,
                      height: 224,
                      backgroundColor: "rgba(245,158,11,0.08)",
                    },
                  ]}
                />

                <View
                  style={[
                    styles.glow,
                    {
                      top: 48,
                      width: 192,
                      height: 192,
                      backgroundColor: "rgba(56,189,248,0.06)",
                    },
                  ]}
                />

                <View style={styles.art}>
                  <LinearGradient
                    colors={[c.tertiaryContainer, c.tertiary, c.tertiaryFixed]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.sun}
                  >
                    <View style={styles.sunInner} />
                  </LinearGradient>

                  <View style={styles.cloudBack} />

                  <View style={styles.cloudFront}>
                    <View style={styles.cloudDomeA} />
                    <View style={styles.cloudDomeB} />
                  </View>

                  <View
                    style={[
                      styles.rain,
                      {
                        bottom: -4,
                        left: 56,
                        height: 12,
                        opacity: 0.4,
                      },
                    ]}
                  />

                  <View
                    style={[
                      styles.rain,
                      {
                        bottom: 4,
                        left: 88,
                        height: 8,
                        opacity: 0.3,
                      },
                    ]}
                  />

                  <View
                    style={[
                      styles.rain,
                      {
                        bottom: -8,
                        left: 104,
                        height: 12,
                        opacity: 0.5,
                      },
                    ]}
                  />
                </View>

                {/* Temperature */}
                <View style={styles.tempRow}>
                  <Text style={styles.temp}>{weather.temp}</Text>
                  <Text style={styles.tempUnit}>{weather.unit}</Text>
                </View>

                <View style={styles.conditionPill}>
                  <Text style={styles.conditionText}>{weather.condition}</Text>
                </View>

                <View style={styles.feelsRow}>
                  <MaterialCommunityIcons
                    name="thermometer"
                    size={16}
                    color={c.primary}
                  />

                  <Text style={styles.feelsText}>
                    Feels like{" "}
                    <Text style={styles.feelsStrong}>
                      {weather.feelsLike}°C
                    </Text>
                  </Text>

                  <Text style={styles.dot}>•</Text>

                  <Text style={styles.highLow}>
                    H: {weather.high}° L: {weather.low}°
                  </Text>
                </View>
              </View>

              {/* Hourly Forecast */}
              <HourlyForecast hourly={hourly} />
              {/* Weather Details Grid */}
              <WeatherGrid {...weather} />
              {/* Visibility + AQI */}
              <View style={[styles.card, styles.wideCard]}>
                <View style={styles.cardTitleRow}>
                  <View style={styles.visIcon}>
                    <MaterialCommunityIcons
                      name="eye"
                      size={22}
                      color={c.primary}
                    />
                  </View>

                  <View>
                    <Text style={styles.cardTitle}>VISIBILITY</Text>

                    <View style={styles.valueRow}>
                      <Text style={styles.visValue}>
                        {weather.visibility.value} km
                      </Text>

                      <Text style={styles.visLabel}>
                        • {weather.visibility.label}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.cardTitle}>AIR QUALITY</Text>

                  <View style={styles.aqiRow}>
                    <View style={styles.aqiDot} />

                    <Text style={styles.aqiText}>
                      AQI {weather.aqi.value} ({weather.aqi.label})
                    </Text>
                  </View>
                </View>
              </View>

              {/* Forecast Tip */}
              <View style={styles.tip}>
                <MaterialCommunityIcons
                  name="white-balance-sunny"
                  size={18}
                  color={c.tertiary}
                />

                <Text style={styles.tipText}>{weather.tip}</Text>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
