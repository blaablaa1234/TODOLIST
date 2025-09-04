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
import { lightTheme, darkTheme } from "./ManageThemes";
import { useMode } from "./ThemeContext";

interface DeleteModalProps {
  isOpen: boolean;
  itemTitle?: string;
  onCloseModal: () => void;
  onConfirmDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  itemTitle,
  onCloseModal,
  onConfirmDelete,
}) => {
  const { theme } = useMode();

  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Dialog open={isOpen} onClose={onCloseModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the mission? <br />
            <b>"{itemTitle}"</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button color="error" onClick={onConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default DeleteModal;
