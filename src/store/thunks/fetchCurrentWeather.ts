import { WeatherService } from "../../services/CurrentWeatherService";
import { currenWeatherSlice } from "../slices/currentWeatherSlice";
import { AppDispatch } from "../store";

export const fetchCurrentWeather =
  (payload: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(currenWeatherSlice.actions.fetchCurrentWeather());
      const res = await WeatherService.getCurrentWeather(payload);
      if (res.status === 200) {
        dispatch(currenWeatherSlice.actions.fetchCurrentWeatherSuccess(res));
      } else {
        dispatch(currenWeatherSlice.actions.fetchCurrentWeatherError(res));
      }
    } catch (error: any) {
      dispatch(
        currenWeatherSlice.actions.fetchCurrentWeatherError(error.response)
      );
      console.error(error);
    }
  };

export const fetchForecastWeather =
  (payload: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(currenWeatherSlice.actions.fetchForecastWeather());
      const res = await WeatherService.getForecastWeather(payload);
      if (res.status === 200) {
        dispatch(currenWeatherSlice.actions.fetchForecastWeatherSuccess(res));
      } else {
        dispatch(currenWeatherSlice.actions.fetchForecastWeatherError(res));
      }
    } catch (error: any) {
      dispatch(
        currenWeatherSlice.actions.fetchForecastWeatherError(error.response)
      );
      console.error(error);
    }
  };
