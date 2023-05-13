import { AxiosResponse } from "axios";
import api from "../axios";
import { Weather, WeatherForecastApiResponse } from "../store/types/types";

export class WeatherService {
  static getCurrentWeather(city: string): Promise<AxiosResponse<any>> {
    return api.get<Weather>(`/weather?q=${city}`);
  }
  static getForecastWeather(city: string): Promise<AxiosResponse<any>> {
    return api.get<WeatherForecastApiResponse>(`/forecast?q=${city}&cnt=7`);
  }
}
