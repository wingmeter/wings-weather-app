import s from "./ThisDayInfo.module.scss";
import cloud from "../../../../assets/images/cloud.png";
import { ThisDayItem } from "./ThisDayItem";
import { Weather } from "../../../../store/types/types";
import { TempUnit, celciusToFahrenheit } from "../../../../utils/helpers";

interface Props {
  weather: Weather;
  tempUnit: TempUnit;
}

export interface Item {
  icon_id: string;
  name: string;
  value: string;
}

export const ThisDayInfo = ({ weather, tempUnit }: Props) => {
  const items = [
    {
      icon_id: "temp",
      name: "Temperature",
      value: `${
        tempUnit === TempUnit.CELCIUS
          ? Math.floor(weather.main.temp)
          : celciusToFahrenheit(weather.main.temp)
      }° - feels like ${
        tempUnit === TempUnit.CELCIUS
          ? Math.floor(weather.main.feels_like)
          : celciusToFahrenheit(weather.main.feels_like)
      }°`,
    },
    {
      icon_id: "pressure",
      name: "Pressure",
      value: `${weather?.main?.pressure} mmHg`,
    },
    {
      icon_id: "precipitation",
      name: "Precipitation",
      value: `${weather?.main?.humidity}%`,
    },
    {
      icon_id: "wind",
      name: "Wind",
      value: `${weather?.wind?.speed} m/s`,
    },
  ];
  return (
    <div className={s.this__day_info}>
      <div className={s.this__day_info_items}>
        {items.map((item: Item) => (
          <ThisDayItem key={item.icon_id} item={item} />
        ))}
      </div>
      <img className={s.cloud__img} src={cloud} alt="облако" />
    </div>
  );
};
