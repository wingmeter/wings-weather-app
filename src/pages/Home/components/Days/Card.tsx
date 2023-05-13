import { GlobalSvgSelector } from "../../../../assets/icons/GlobalSvgSelector";
import { Day } from "./Days";

import s from "./Days.module.scss";

interface Props {
  day: string;
  day_info: string;
  icon_id: string;
  temp_day: number | string;
  temp_night: string | string;
  info: string;
}

export const Card = ({
  day,
  day_info,
  icon_id,
  temp_day,
  temp_night,
  info,
}: Props) => {
  return (
    <div className={s.card}>
      <div className={s.day}>{day}</div>
      <div className={s.day__info}>{day_info}</div>
      <div className={s.img}>
        <GlobalSvgSelector id={icon_id} />
      </div>
      <div className={s.temp__day}>+{temp_day}</div>
      <div className={s.temp__night}>+{temp_night}</div>
      <div className={s.info}>{info}</div>
    </div>
  );
};
