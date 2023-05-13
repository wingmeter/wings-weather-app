import { GlobalSvgSelector } from "../../../../assets/icons/GlobalSvgSelector";
import { Weather } from "../../../../store/types/types";
import s from "./ThisDay.module.scss";

import {
  TempUnit,
  getDate,
  celciusToFahrenheit,
} from "../../../../utils/helpers";

interface Props {
  weather: Weather;
  tempUnit: TempUnit;
}

export const ThisDay = ({ weather, tempUnit }: Props) => {
  const icon = weather.weather?.length ? weather?.weather[0].icon : "";

  return (
    <div className={s.this__day}>
      <div className={s.top__block}>
        <div className={s.top__block_wrapper}>
          <div className={s.this__temp}>
            {tempUnit === "celcius"
              ? Math.floor(weather.main?.temp)
              : celciusToFahrenheit(weather.main?.temp)}
            °
          </div>
          <div className={s.this__day_name}>Today</div>
        </div>
        <GlobalSvgSelector id={icon} />
      </div>
      <div className={s.bottom__block}>
        <div>
          <div className={s.this__time}>
            Time: <span>{getDate(weather.dt, weather.timezone)}</span>
          </div>
          <div className={s.this__city}>
            City: <span>{weather.name}</span>
          </div>
        </div>
        <div>
          <div className={s.this__time}>
            Min Temperature:{" "}
            <span>
              {tempUnit === "celcius"
                ? Math.floor(weather.main.temp_min)
                : celciusToFahrenheit(weather.main.temp_min)}
              °
            </span>
          </div>
          <div className={s.this__city}>
            Max Temperature:{" "}
            <span>
              {tempUnit === "celcius"
                ? Math.floor(weather.main.temp_max)
                : celciusToFahrenheit(weather.main.temp_max)}
              °
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
