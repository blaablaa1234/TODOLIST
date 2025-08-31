import "./App.css";
import React, { useReducer } from "react";
import { todoReducer, Todo } from "./components/TodoReducer";
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
import TodoApp from "./components/Form";

const AppContent = () => {
  const { theme } = useMode();

  const [todos, dispatch] = useReducer(todoReducer, missionItems);

  const handleToggleComplete = (id: number) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <ThemeButton />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={6}
      >
        <div className="title">
          <h1>TODO-LIST</h1>
        </div>
        <CiBoxList size={66} />
      </Box>
      <TodoApp dispatch={dispatch} />
      <Grid container spacing={2} padding={10}>
        {todos.map((todo) => (
          <Grid key={todo.id}>
            <MissionsCard data={todo} onToggleComplete={handleToggleComplete} />
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
