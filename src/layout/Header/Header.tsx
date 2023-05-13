import { useState, useEffect } from "react";

import Select from "react-select";
import DarkModeToggle from "react-dark-mode-toggle";

import { GlobalSvgSelector } from "../../assets/icons/GlobalSvgSelector";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../context/ThemeContext";

import styles from "./Header.module.scss";
import ToggleSwitch from "../../components/UI/ToggleSwitch/ToggleSwitch";
import { useCustomDispatch } from "../../hooks/store";
import { currenWeatherSlice } from "../../store/slices/currentWeatherSlice";
import { cityList } from "../../data/data";
import { storage } from "../../model/Storage";

interface Props {}

const Header = (props: Props) => {
  const theme = useTheme();

  const currentCity = storage.getItem("city");

  const findCurrentCity = cityList.find((item) => item.value === currentCity);

  const dispatch = useCustomDispatch();

  const [selectCityValue, setSelectCityValue] = useState<any>(
    findCurrentCity || cityList[0]
  );

  const [geoResult, setGeoResult] = useState<string>("");

  const setCity = (city: string) => {
    setSelectCityValue(cityList.find((item) => item.value === city));
    dispatch(currenWeatherSlice.actions.setCurrentCity(city));
  };

  useEffect(() => {
    if (geoResult === "город Бишкек") {
      dispatch(currenWeatherSlice.actions.setCurrentCity("bishkek"));
      setSelectCityValue(cityList.find((item) => item.value === "bishkek"));
      storage.setItem("city", "bishkek");
    }
  }, [geoResult]);

  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor:
        theme.theme === Theme.DARK ? "#4F4F4F" : "rgba(71, 147, 255, 0.2)",
      width: "100%",
      height: "37px",
      fontSize: "0.8rem",
      border: "none",
      borderRadius: "10px",
      zIndex: 100,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: theme.theme === Theme.DARK ? "#fff" : "#000",
    }),
  };

  const showPosition = (position: any) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGeoResult(data.address.city);
      });
  };

  function changeTheme() {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <GlobalSvgSelector id="header-logo" />
        </div>
        <div className={styles.title}>Wings Weather</div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.location}>
          <button
            className={styles.location_button}
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
              } else {
                alert("Geolocation is not supported by this browser.");
              }
            }}
          >
            <span>Geo</span>
            <GlobalSvgSelector id="location-icon" />
          </button>
        </div>
        <div className={styles.tempUnit}>
          <ToggleSwitch
            onClick={() =>
              dispatch(currenWeatherSlice.actions.changeTempUnit())
            }
          />
        </div>
        <div className={styles.change_theme}>
          <DarkModeToggle
            checked={theme.theme === Theme.DARK}
            onChange={changeTheme}
            size={60}
          />
        </div>
        <div className={styles.select_city}>
          <Select
            styles={colourStyles}
            options={cityList}
            defaultValue={selectCityValue}
            onChange={(e) => setCity(e?.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
