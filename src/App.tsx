import React, { useReducer } from "react";
import MissionsCard from "./components/Card";
import {
  Grid,
  Box,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Snackbar,
  Typography,
} from "@mui/material";
import { todoReducer } from "./components/TodoReducer";
import { missionItems } from "./components/TodoList";
import { ThemeProvider, useMode } from "./components/ThemeContext";
import ThemeButton from "./components/ThemeButton";
import { lightTheme, darkTheme } from "./components/ManageThemes";
import TodoForm from "./components/Form";
import deleteReducer, { initialDeleteState } from "./components/DeleteReducer";
import { MissionData } from "./components/TodoList";
import DeleteModal from "./DeleteModal";

const AppContent = () => {
  const { theme } = useMode();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [todos, dispatch] = useReducer(todoReducer, missionItems);
  const [deleteState, deleteDispatch] = useReducer(
    deleteReducer,
    initialDeleteState
  );

  const handleToggleComplete = (id: number) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  const handleDeleteRequest = (item: MissionData) => {
    deleteDispatch({ type: "OPEN_MODAL", payload: item });
  };

  const handleDeleteConfirm = () => {
    if (!deleteState.itemToDelete) return;
    const id = deleteState.itemToDelete.id;

    dispatch({ type: "DELETE_TODO", payload: id });
    deleteDispatch({ type: "DELETE_SUCCESS" });
    deleteDispatch({ type: "CLOSE_MODAL" });
    setSnackbarOpen(true);
  };

  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <ThemeButton />
      <Box display="flex" flexDirection="column" height="100vh">
        <Box flex={1} overflow="auto">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop={6}
          >
            <h1>TODO-LIST</h1>
          </Box>
          <Box flex={2}>
            <TodoForm dispatch={dispatch} />
          </Box>
          <Box flex={1}>
            <Grid
              container
              spacing={2}
              padding={10}
              sx={{
                minHeight: "300px",
                width: "100%",
                justifyContent: todos.length === 0 ? "center" : "flex-start",
                transition: "all 0.3s ease",
              }}
            >
              {todos.length === 0 ? (
                <Typography variant="h6" style={{ margin: "auto" }}>
                  <h1>No missions yet</h1>
                </Typography>
              ) : (
                todos.map((todo) => (
                  <Grid key={todo.id} size={{ xs: 12, sm: 6, md: 3 }}>
                    <MissionsCard
                      data={todo}
                      onToggleComplete={handleToggleComplete}
                      onDeleteRequest={handleDeleteRequest}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Box>

        <DeleteModal
          deleteState={deleteState}
          deleteDispatch={deleteDispatch}
          onConfirmDelete={handleDeleteConfirm}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="✅ Mission deleted!"
        />
      </Box>
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
