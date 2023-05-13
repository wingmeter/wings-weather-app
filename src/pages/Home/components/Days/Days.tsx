import { WeatherForecastApiResponse } from "../../../../store/types/types";
import { TempUnit, celciusToFahrenheit } from "../../../../utils/helpers";
import { Card } from "./Card";

import s from "./Days.module.scss";
import { Tabs } from "./Tabs";

interface Props {
  data: WeatherForecastApiResponse;
  tempUnit: TempUnit;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface Day {
  day: string;
  day_info: string;
  icon_id: string;
  temp_day: string;
  temp_night: string;
  info: string;
}

export const Days = ({ data, tempUnit }: Props) => {
  const dayMonth = (item: any) => {
    const date = new Date(item);
    const day = date.getDate();
    const month = date.getMonth();

    return `${day} ${monthNames[month]}`;
  };

  return (
    <>
      <Tabs />
      <div className={s.days}>
        {data.list.map((day: any, index: any) => (
          <Card
            day={day.dt_txt.slice(11, 16)}
            day_info={dayMonth(day.dt_txt)}
            icon_id={day.weather[0].icon}
            temp_day={
              tempUnit === TempUnit.CELCIUS
                ? Math.floor(day.main.temp)
                : celciusToFahrenheit(Math.floor(day.main.temp))
            }
            temp_night={String(
              tempUnit === TempUnit.CELCIUS
                ? Math.floor(day.main.temp - 4)
                : celciusToFahrenheit(Math.floor(day.main.temp - 4))
            )}
            info={day.weather[0].description}
            key={index}
          />
        ))}
      </div>
    </>
  );
};
