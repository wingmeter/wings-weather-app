import { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { changeCssRootVariables } from "../model/ChangeCssRootVariables";
import { Theme } from "../context/ThemeContext";
import { storage } from "../model/Storage";

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children, ...props }: Props) => {
  const [theme, setTheme] = useState<Theme>(
    storage.getItem("theme") || Theme.LIGHT
  );

  changeCssRootVariables(theme);

  function changeTheme(theme: Theme) {
    setTheme(theme);
    storage.setItem("theme", theme);
  }
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }} {...props}>
      {children}
    </ThemeContext.Provider>
  );
};
