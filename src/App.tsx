import "./App.css";
import React, { useReducer } from "react";
import { todoReducer } from "./components/TodoReducer";
import MissionsCard from "./components/Card";
import {
  Grid,
  Box,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import { missionItems } from "./components/TodoList";
import { CiBoxList } from "react-icons/ci";
import { ThemeProvider, useMode } from "./components/ThemeContext";
import ThemeButton from "./components/ThemeButton";
import { lightTheme, darkTheme } from "./components/ManageThemes";
import TodoForm from "./components/Form";
import deleteReducer, { initialDeleteState } from "./components/DeleteReducer";
import { MissionData } from "./components/TodoList";

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

    const cardElement = document.getElementById(`card-${id}`);
    if (cardElement) {
      cardElement.classList.add("fade-out");
    }

    setTimeout(() => {
      dispatch({ type: "DELETE_TODO", payload: id });
      deleteDispatch({ type: "DELETE_SUCCESS" });
      setSnackbarOpen(true);
    }, 300);
    dispatch({
      type: "DELETE_TODO",
      payload: deleteState.itemToDelete.id,
    });

    deleteDispatch({ type: "DELETE_SUCCESS" });
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
            <div className="title">
              <h1>TODO-LIST</h1>
            </div>
            <CiBoxList size={66} />
          </Box>
          <Box flex={2}>
            <TodoForm dispatch={dispatch} />
          </Box>
          <Grid
            container
            spacing={2}
            padding={10}
            style={{ minHeight: "300px" }}
          >
            {todos.length === 0 ? (
              <Typography variant="h6" style={{ margin: "auto" }}>
                <h1> No missions yet </h1>
              </Typography>
            ) : (
              todos.map((todo) => (
                <Grid key={todo.id}>
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
        <Dialog
          open={deleteState.isModalOpen}
          onClose={() => deleteDispatch({ type: "CLOSE_MODAL" })}
        >
          <DialogTitle>Access delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the mission?
              <br></br>
              <b> "{deleteState.itemToDelete?.title}?"</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => deleteDispatch({ type: "CLOSE_MODAL" })}>
              Cancel
            </Button>
            <Button color="error" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message=" ✅ Mission deleted!"
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
