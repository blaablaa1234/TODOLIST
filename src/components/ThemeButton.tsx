import { useMode } from "../contexts/ModeContext";

const LIGHT_SWITCH_ON_ICON = "/lightswitch-on.png";
const LIGHT_SWITCH_OFF_ICON = "/lightswitch-off.png";

const ThemeButton = () => {
  const { mode, toggleTheme } = useMode();

  const image = mode === "light" ? LIGHT_SWITCH_ON_ICON : LIGHT_SWITCH_OFF_ICON;

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
