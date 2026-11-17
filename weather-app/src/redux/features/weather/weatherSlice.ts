import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getWeatherData } from "@/service/weatherApi";
import type { WeatherScreenData } from "@/types/weatherType";

// 1. Define the state structure
interface WeatherState {
  weatherData: WeatherScreenData | null;
  loading: boolean;
  error: string | null;
}

// 2. Initial state
const initialState: WeatherState = {
  weatherData: null,
  loading: false,
  error: null,
};

// 3. Async operation
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string) => {
    if (!city.trim()) {
      throw new Error("Please enter a city name.");
    }
    console.log("Fetching weather for:", city);
    const data = await getWeatherData(city.trim());
    console.log("Fetched weather data:", data);
    return data;
  },
);

// 4. Create the slice
const weatherSlice = createSlice({
  name: "weather",
  initialState,

  // Synchronous reducers
  reducers: {
    clearWeatherError: (state) => {
      state.error = null;
    },
  },

  // Handles async thunk actions
  extraReducers: (builder) => {
    builder
      // Request started
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Request succeeded
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
      })

      // Request failed
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong.";
      });
  },
});

// Export action
export const { clearWeatherError } = weatherSlice.actions;

// Export reducer
export default weatherSlice.reducer;
