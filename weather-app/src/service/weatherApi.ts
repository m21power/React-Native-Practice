import type {
  HourlyWeather,
  IconName,
  WeatherData,
  WeatherScreenData,
} from "../types/weatherType.ts";

function getWeatherIcon(condition: string, isDay: number): IconName {
  const text = condition.toLowerCase();

  if (text.includes("thunder")) return "weather-lightning";
  if (text.includes("snow") || text.includes("blizzard"))
    return "weather-snowy";
  if (text.includes("rain") || text.includes("drizzle")) return "weather-rainy";
  if (text.includes("fog") || text.includes("mist")) return "weather-fog";
  if (text.includes("cloud")) {
    return text.includes("partly")
      ? isDay
        ? "weather-partly-cloudy"
        : "weather-night-partly-cloudy"
      : "weather-cloudy";
  }

  if (text.includes("clear") || text.includes("sunny")) {
    return isDay ? "weather-sunny" : "weather-night";
  }

  return "weather-partly-cloudy";
}

function getHumidityLabel(value: number): string {
  if (value < 30) return "Low";
  if (value <= 60) return "Comfortable";
  if (value <= 80) return "Normal";
  return "High";
}

function getWindLabel(speed: number): string {
  if (speed < 12) return "Light breeze";
  if (speed < 30) return "Breezy conditions";
  if (speed < 50) return "Windy conditions";
  return "Strong winds";
}

function getUVLabel(value: number) {
  if (value < 3)
    return { label: "Low", note: "No special sun protection needed." };
  if (value < 6) return { label: "Moderate", note: "Consider sun protection." };
  if (value < 8) return { label: "High", note: "Sun protection recommended." };
  if (value < 11)
    return { label: "Very High", note: "Extra sun protection needed." };

  return { label: "Extreme", note: "Avoid prolonged sun exposure." };
}

function getVisibilityLabel(value: number): string {
  if (value >= 10) return "Optimal";
  if (value >= 5) return "Good";
  if (value >= 2) return "Moderate";
  return "Poor";
}

function getAQILabel(value: number): string {
  if (value <= 50) return "Good";
  if (value <= 100) return "Moderate";
  if (value <= 150) return "Unhealthy for sensitive groups";
  if (value <= 200) return "Unhealthy";
  if (value <= 300) return "Very unhealthy";
  return "Hazardous";
}

function getWeatherTip(
  condition: string,
  temp: number,
  chanceOfRain: number,
  windSpeed: number,
): string {
  if (chanceOfRain >= 60)
    return "Rain is likely. Consider carrying an umbrella.";
  if (windSpeed >= 40) return "Strong winds expected. Take care outdoors.";
  if (temp >= 30) return "It's hot outside. Stay hydrated.";
  if (temp <= 5) return "It's cold outside. Dress warmly.";
  if (condition.toLowerCase().includes("cloud")) {
    return "Cloudy skies expected. Enjoy your day.";
  }

  return "Have a great day!";
}

function getTimeLabel(time: string): string {
  return time.split(" ")[1]?.slice(0, 5) ?? time;
}

function getHourlyColor(condition: string): string {
  const text = condition.toLowerCase();

  if (text.includes("rain") || text.includes("drizzle")) return "#8ed5ff";
  if (text.includes("cloud") || text.includes("fog")) return "#7bd0ff";
  if (text.includes("snow")) return "#bdc2ff";
  return "#ffc174";
}

// Main mapper
export function mapWeatherResponse(data: any): WeatherScreenData {
  const current = data.current;
  const forecast = data.forecast.forecastday[0];
  const uv = getUVLabel(current.uv);

  const weather: WeatherData = {
    city: data.location.name,
    country: data.location.country,
    date: new Date(data.location.localtime.replace(" ", "T")).toLocaleString(
      "en-GB",
      {
        weekday: "long",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    ),
    temp: Math.round(current.temp_c),
    unit: "°C",
    condition: current.condition.text,
    feelsLike: Math.round(current.feelslike_c),
    high: Math.round(forecast.day.maxtemp_c),
    low: Math.round(forecast.day.mintemp_c),

    humidity: {
      value: current.humidity,
      label: getHumidityLabel(current.humidity),
      dewPoint: current.dewpoint_c,
    },

    wind: {
      speed: current.wind_kph,
      unit: "km/h",
      direction: current.wind_dir,
      gusts: current.gust_kph,
      label: getWindLabel(current.wind_kph),
    },

    precip: {
      chance: current.chance_of_rain,
      window: "Next 6h",
      mm: current.precip_mm,
    },

    uv: {
      value: current.uv,
      label: uv.label,
      note: uv.note,
    },

    visibility: {
      value: current.vis_km,
      label: getVisibilityLabel(current.vis_km),
    },

    aqi: {
      value: current.air_quality?.["us-epa-index"] ?? 0,
      label: getAQILabel(current.air_quality?.["us-epa-index"] ?? 0),
    },

    tip: getWeatherTip(
      current.condition.text,
      current.temp_c,
      current.chance_of_rain,
      current.wind_kph,
    ),
  };

  const hourly: HourlyWeather[] = forecast.hour
    .filter(
      (hour: any) =>
        new Date(hour.time.replace(" ", "T")) >=
        new Date(data.location.localtime.replace(" ", "T")),
    )
    .slice(0, 5)
    .map((hour: any) => ({
      time: getTimeLabel(hour.time),
      icon: getWeatherIcon(hour.condition.text, hour.is_day),
      temp: Math.round(hour.temp_c),
      color: getHourlyColor(hour.condition.text),
      active: false,
    }));

  if (hourly.length > 0) {
    hourly[0].time = "Now";
    hourly[0].active = true;
  }

  return { weather, hourly };
}

export function getWeatherData(city: string): Promise<WeatherScreenData> {
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4265815400554056916115229261711&q=${city}&days=1&aqi=yes`,
  )
    .then((response) => response.json())
    .then((json) => mapWeatherResponse(json));
}
