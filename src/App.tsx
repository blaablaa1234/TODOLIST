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
import { todoReducer } from "./reducers/TodoReducer";
import { missionItems } from "./components/TodoList";
import { ModeProvider, useMode } from "./components/ThemeContext";
import ThemeButton from "./components/ThemeButton";
import { lightTheme, darkTheme } from "./components/ManageThemes";
import TodoForm from "./components/Form";
import deleteReducer, { initialDeleteState } from "./reducers/ModalReducer";
import { MissionData } from "./components/TodoList";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";

const AppContent = () => {
  const { mode } = useMode();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [todos, dispatch] = useReducer(todoReducer, missionItems);
  const [editItem, setEditItem] = React.useState<MissionData | null>(null);
  const [deleteState, dispatchModalAction] = useReducer(
    deleteReducer,
    initialDeleteState
  );
  const handleEditRequest = (item: MissionData) => {
    setEditItem(item);
  };
  const handleSaveEdit = (updatedItem: MissionData) => {
    dispatch({ type: "EDIT_TODO", payload: updatedItem });
    setEditItem(null);
  };

  const handleToggleComplete = (id: number) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  const handleDeleteRequest = (item: MissionData) => {
    dispatchModalAction({ type: "OPEN_MODAL", payload: item });
  };

  const handleDeleteConfirm = () => {
  if (!deleteState.itemToDelete) return;
  const id = deleteState.itemToDelete.id;

  try {
    dispatch({ type: "DELETE_TODO", payload: id });
    dispatchModalAction({ type: "CLOSE_MODAL" });
    setSnackbarOpen(true);
  } catch (error) {
    console.error("Failed to delete:", error);
  }
};


  return (
    <MuiThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
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
                      onEditRequest={handleEditRequest}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Box>

        <DeleteModal
          isOpen={deleteState.isModalOpen}
          itemTitle={deleteState.itemToDelete?.title}
          onCloseModal={() => dispatchModalAction({ type: "CLOSE_MODAL" })}
          onConfirmDelete={handleDeleteConfirm}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="✅ Mission deleted!"
        />
        <EditModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={handleSaveEdit}
        />
      </Box>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ModeProvider>
      <AppContent />
    </ModeProvider>
  );
}
export default App;
