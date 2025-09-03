import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { lightTheme, darkTheme } from "./components/ManageThemes";
import { useMode } from "./components/ThemeContext";

interface DeleteModalProps {
  deleteState: any;
  deleteDispatch: React.Dispatch<any>;
  onConfirmDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  deleteState,
  deleteDispatch,
  onConfirmDelete,
}) => {
  const { theme } = useMode();

  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Dialog
        open={deleteState.isModalOpen}
        onClose={() => deleteDispatch({ type: "CLOSE_MODAL" })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the mission? <br />
            <b>"{deleteState.itemToDelete?.title}"</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteDispatch({ type: "CLOSE_MODAL" })}>
            Cancel
          </Button>
          <Button color="error" onClick={onConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default DeleteModal;
