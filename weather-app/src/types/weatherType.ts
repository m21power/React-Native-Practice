export type IconName =
  | "weather-partly-cloudy"
  | "weather-cloudy"
  | "weather-rainy"
  | "weather-sunny"
  | "weather-night-partly-cloudy"
  | "weather-night"
  | "weather-lightning"
  | "weather-snowy"
  | "weather-fog";

export interface HourlyWeather {
  time: string;
  icon: IconName;
  temp: number;
  color: string;
  active?: boolean;
}

export interface WeatherData {
  city: string;
  country: string;
  date: string;
  temp: number;
  unit: "°C";
  condition: string;
  feelsLike: number;
  high: number;
  low: number;
  humidity: {
    value: number;
    label: string;
    dewPoint: number;
  };
  wind: {
    speed: number;
    unit: "km/h";
    direction: string;
    gusts: number;
    label: string;
  };
  precip: {
    chance: number;
    window: string;
    mm: number;
  };
  uv: {
    value: number;
    label: string;
    note: string;
  };
  visibility: {
    value: number;
    label: string;
  };
  aqi: {
    value: number;
    label: string;
  };
  tip: string;
}

export interface WeatherScreenData {
  weather: WeatherData;
  hourly: HourlyWeather[];
}
