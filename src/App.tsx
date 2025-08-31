import "./App.css";
import MissionsCard from "./components/Card";
import {
  Grid,
  Box,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from "@mui/material";
import { missionItems } from "./components/TodoList";
import { CiBoxList } from "react-icons/ci";
import { ThemeProvider, useMode } from "./components/ThemeContext";
import ThemeButton from "./components/ThemeButton";
import { lightTheme, darkTheme } from "./components/ManageThemes";

const AppContent = () => {
  const { theme } = useMode();

  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <ThemeButton />
      <Box display="flex" alignItems="center" justifyContent="center">
        <h1>TODO-LIST</h1>
        <CiBoxList size={66} />
      </Box>
      <Grid container spacing={2} padding={10}>
        {missionItems.map((missionData) => (
          <Grid key={missionData.id}>
            <MissionsCard data={missionData} />
          </Grid>
        ))}
      </Grid>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
