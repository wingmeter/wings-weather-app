import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Weather, WeatherForecastApiResponse } from "../types/types";
import { TempUnit } from "../../utils/helpers";
import { storage } from "../../model/Storage";

type CurrentWeather = {
  tempUnit: TempUnit;
  currentCity: string;
  weather: any;
  forecast: any;
  isLoading: boolean;
  response: Response;
};

export type Response = {
  status: number;
  message: string;
};

const initialState: CurrentWeather = {
  tempUnit: storage.getItem("tempUnit") || TempUnit.CELCIUS,
  currentCity: storage.getItem("city") || "bishkek",
  forecast: {
    list: [],
  },
  weather: {
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
    },
  },
  isLoading: false,
  response: {
    status: 0,
    message: "",
  },
};

export const currenWeatherSlice = createSlice({
  name: "currentWeather",
  initialState,
  reducers: {
    changeTempUnit: (state: CurrentWeather) => {
      state.tempUnit =
        state.tempUnit === TempUnit.CELCIUS
          ? TempUnit.FAHRENHEIT
          : TempUnit.CELCIUS;
      storage.setItem("tempUnit", state.tempUnit);
    },
    setCurrentCity: (state: CurrentWeather, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
      storage.setItem("city", action.payload);
    },
    fetchCurrentWeather: (state) => {
      state.isLoading = true;
    },
    fetchCurrentWeatherSuccess: (
      state,
      action: PayloadAction<AxiosResponse<Weather>>
    ) => {
      state.weather = action.payload.data;
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchCurrentWeatherError: (
      state,
      action: PayloadAction<AxiosResponse<Weather>>
    ) => {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchForecastWeather: (state) => {
      state.isLoading = true;
    },
    fetchForecastWeatherSuccess: (
      state,
      action: PayloadAction<AxiosResponse<WeatherForecastApiResponse>>
    ) => {
      state.forecast = action.payload.data;
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchForecastWeatherError: (
      state,
      action: PayloadAction<AxiosResponse<WeatherForecastApiResponse>>
    ) => {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
  },
});

export default currenWeatherSlice.reducer;
