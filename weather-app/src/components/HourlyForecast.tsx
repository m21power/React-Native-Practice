import { styles } from "@/styles/styles";
import { HourlyWeather, IconName } from "@/types/weatherType";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";

export default function HourlyForecast({
  hourly,
}: {
  hourly: HourlyWeather[];
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.hourlyRow}
      style={styles.hourlyScroll}
    >
      {hourly.map((h) => (
        <View
          key={h.time}
          style={[styles.hourCard, h.active && styles.hourCardActive]}
        >
          <Text style={[styles.hourTime, h.active && styles.hourTimeActive]}>
            {h.time}
          </Text>

          <MaterialCommunityIcons
            name={h.icon as IconName}
            size={20}
            color={h.color}
          />

          <Text style={[styles.hourTemp, h.active && { fontWeight: "600" }]}>
            {h.temp}°
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
