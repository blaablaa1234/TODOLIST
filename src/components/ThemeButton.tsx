import { useThemeProvider } from "./ThemeContext";

const LIGHT_SWITCH_ON_ICON = "/lightswitch-on.png";
const LIGHT_SWITCH_OFF_ICON = "/lightswitch-off.png";

const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeProvider();

  const image = theme === "light" ? LIGHT_SWITCH_ON_ICON : LIGHT_SWITCH_OFF_ICON;

  console.log(theme);

  return (
    <div
      className="manageThemes"
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      <img
        src={image}
        width={120}
        onClick={toggleTheme}
        className="themeImage"
      />
    </div>
  );
};

export default ThemeButton;

