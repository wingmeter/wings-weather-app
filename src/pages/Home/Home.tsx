import { useEffect } from "react";

import styles from "./Home.module.scss";
import { ThisDay } from "./components/ThisDay/ThisDay";
import { ThisDayInfo } from "./components/DaysInfo/ThisDayInfo";
import { Days } from "./components/Days/Days";
import { Popup } from "../../components/Popup/Popup";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import {
  fetchCurrentWeather,
  fetchForecastWeather,
} from "../../store/thunks/fetchCurrentWeather";
import Spinner from "../../components/UI/Spinner/Spinner";

type Props = {};

const Home = (props: Props) => {
  const { weather, isLoading, tempUnit, currentCity, forecast } =
    useCustomSelector((state) => state.currentWeatherSliceReducer);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(fetchCurrentWeather(currentCity));
  }, [currentCity]);

  useEffect(() => {
    dispatch(fetchForecastWeather(currentCity));
  }, [currentCity]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.wrapper}>
        <ThisDay weather={weather} tempUnit={tempUnit} />
        <ThisDayInfo weather={weather} tempUnit={tempUnit} />
      </div>
      <Days data={forecast} tempUnit={tempUnit} />
    </div>
  );
};

export default Home;
