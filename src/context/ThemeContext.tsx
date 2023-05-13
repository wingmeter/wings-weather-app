import { createContext } from "react";

interface Props {
  theme: string;
  changeTheme: (theme: Theme) => void;
}
export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}
export const ThemeContext = createContext<Props>({
  theme: "",
  changeTheme: () => {},
});
