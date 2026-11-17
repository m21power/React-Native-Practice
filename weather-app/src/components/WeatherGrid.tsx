import { c, styles } from "@/styles/styles";
import { WeatherData } from "@/types/weatherType";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

function ProgressBar({ percent, color }: { percent: number; color: string }) {
  return (
    <View style={styles.track}>
      <View
        style={[
          styles.trackFill,
          {
            width: `${Math.min(100, Math.max(0, percent))}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

export default function WeatherGrid(weather: WeatherData) {
  return (
    <View style={styles.grid}>
      {/* Humidity */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.cardTitleRow}>
            <MaterialCommunityIcons name="water" size={20} color={c.primary} />
            <Text style={styles.cardTitle}>HUMIDITY</Text>
          </View>

          <Text style={styles.cardBadgeText}>{weather.humidity.label}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardValue}>{weather.humidity.value}%</Text>

          <Text style={styles.cardNote}>
            The dew point is {weather.humidity.dewPoint}°C
          </Text>
        </View>

        <ProgressBar percent={weather.humidity.value} color={c.primary} />
      </View>

      {/* Wind */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.cardTitleRow}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={20}
              color={c.primary}
            />
            <Text style={styles.cardTitle}>WIND</Text>
          </View>

          <View style={styles.dirBadge}>
            <Text style={styles.dirBadgeText}>{weather.wind.direction}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.valueRow}>
            <Text style={styles.cardValue}>{weather.wind.speed}</Text>
            <Text style={styles.valueUnit}>{weather.wind.unit}</Text>
          </View>

          <Text style={styles.cardNote}>
            Gusts up to {weather.wind.gusts} km/h
          </Text>
        </View>

        <View style={styles.cardTitleRow}>
          <MaterialCommunityIcons
            name="navigation"
            size={14}
            color={c.primary}
            style={{ transform: [{ rotate: "45deg" }] }}
          />
          <Text style={styles.cardNote}>{weather.wind.label}</Text>
        </View>
      </View>

      {/* Precipitation */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.cardTitleRow}>
            <MaterialCommunityIcons
              name="weather-rainy"
              size={20}
              color={c.primaryContainer}
            />
            <Text style={styles.cardTitle}>PRECIP</Text>
          </View>

          <Text style={styles.cardNote}>{weather.precip.window}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardValue}>{weather.precip.chance}%</Text>

          <Text style={styles.cardNote}>
            {weather.precip.mm} mm precipitation
          </Text>
        </View>

        <ProgressBar
          percent={weather.precip.chance}
          color={c.primaryContainer}
        />
      </View>

      {/* UV */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.cardTitleRow}>
            <MaterialCommunityIcons
              name="weather-sunny"
              size={20}
              color={c.tertiary}
            />
            <Text style={styles.cardTitle}>UV INDEX</Text>
          </View>

          <View style={styles.uvBadge}>
            <Text style={styles.uvBadgeText}>{weather.uv.label}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardValue}>{weather.uv.value}</Text>

          <Text style={styles.cardNote}>{weather.uv.note}</Text>
        </View>

        <View style={styles.track}>
          <LinearGradient
            colors={[c.primary, c.tertiary, c.error]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.trackFill,
              {
                width: `${Math.min(100, (weather.uv.value / 11) * 100)}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}
