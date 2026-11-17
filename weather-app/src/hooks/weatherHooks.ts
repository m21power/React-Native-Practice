import { getWeatherData } from "@/service/weatherApi";
import { WeatherScreenData } from "@/types/weatherType";
import React from "react";

export function useWeather() {
  const [weatherData, setWeatherData] =
    React.useState<WeatherScreenData | null>(null);

  const [city, setCity] = React.useState("London");
  const [searchCity, setSearchCity] = React.useState("London");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  /* ---------------- Fetch Weather ---------------- */

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getWeatherData(cityName.trim());

      setWeatherData(data);
      setCity(cityName.trim());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Initial Fetch ---------------- */

  React.useEffect(() => {
    fetchWeather("London");
  }, []);
  return {
    weatherData,
    city,
    searchCity,
    setSearchCity,
    loading,
    error,
    fetchWeather,
  };
}
