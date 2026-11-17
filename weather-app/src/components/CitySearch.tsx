import { c } from "@/styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CitySearch({
  searchCity,
  setSearchCity,
  fetchWeather,
  loading,
  error,
  weatherData,
}: {
  searchCity: string;
  setSearchCity: (city: string) => void;
  fetchWeather: (city: string) => void;
  loading: boolean;
  error: string;
  weatherData: any;
}) {
  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: c.surfaceLowest,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: c.primary,
          paddingHorizontal: 14,
        }}
      >
        <MaterialCommunityIcons name="magnify" size={22} color={c.primary} />

        <TextInput
          value={searchCity}
          onChangeText={setSearchCity}
          placeholder="Search city..."
          placeholderTextColor="#888"
          returnKeyType="search"
          onSubmitEditing={() => fetchWeather(searchCity)}
          style={{
            flex: 1,
            color: c.onSurface,
            paddingVertical: 14,
            paddingHorizontal: 10,
            fontSize: 15,
          }}
        />

        <TouchableOpacity
          onPress={() => fetchWeather(searchCity)}
          disabled={loading}
          style={{
            backgroundColor: c.primary,
            paddingHorizontal: 14,
            paddingVertical: 9,
            borderRadius: 10,
            opacity: loading ? 0.5 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && weatherData && (
        <View style={{ marginTop: 10 }}>
          <ActivityIndicator color={c.primary} />
        </View>
      )}

      {!!error && (
        <Text
          style={{
            color: "#ff6b6b",
            marginTop: 10,
            fontSize: 13,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
