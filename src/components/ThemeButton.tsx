import React from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { RxSwitch } from "react-icons/rx";

let image;
const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  if (theme === "light") {
    image = "/lightswitch-on.png";
  } else {
    image = "/lightswitch-off.png";
  }
  console.log(theme);
  return (
    <div className="manageThemes">
      <img src={image} width={120} onClick={toggleTheme} className="themeImage"/>
    </div>
  );
};

export default ThemeButton;
