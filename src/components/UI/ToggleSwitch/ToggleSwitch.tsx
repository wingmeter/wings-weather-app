import React from "react";
import styles from "./ToggleSwitch.module.scss";
import { storage } from "../../../model/Storage";
import { TempUnit } from "../../../utils/helpers";

interface IToggleSwitchProps {
  onClick: () => void;
}

const ToggleSwitch: React.FC<IToggleSwitchProps> = (props) => {
  const tempUnit = storage.getItem("tempUnit");

  const [toggled, setToggled] = React.useState<TempUnit>(tempUnit);

  return (
    <label
      className={styles.switch}
      onClick={() => {
        setToggled((checked) =>
          checked === TempUnit.CELCIUS ? TempUnit.FAHRENHEIT : TempUnit.CELCIUS
        );
        props.onClick();
      }}
    >
      {toggled === TempUnit.FAHRENHEIT && <span className={styles.on}>C</span>}
      {toggled === TempUnit.CELCIUS && <span className={styles.off}>F</span>}
      <div
        className={styles.slider}
        style={{
          transform:
            toggled === TempUnit.FAHRENHEIT
              ? " translateX(36px)"
              : " translateX(0px)",
        }}
      ></div>
    </label>
  );
};

export default ToggleSwitch;
