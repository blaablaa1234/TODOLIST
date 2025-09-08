import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { MissionData } from "./TodoList";
import { MIN_DIFFICULTY, MAX_DIFFICULTY } from "./constants";

interface EditProps {
  item: MissionData | null;
  onClose: () => void;
  onSave: (updatedItem: MissionData) => void;
}

const EditModal: React.FC<EditProps> = ({ item, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState<number>(MIN_DIFFICULTY);

  const isValidDifficulty =
    difficulty >= MIN_DIFFICULTY &&
    difficulty <= MAX_DIFFICULTY &&
    Number.isInteger(difficulty);

  const isFormValid = title.trim() !== "" && isValidDifficulty;

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDifficulty(item.difficulty);
    }
  }, [item]);

  const handleSave = () => {
    if (item && isFormValid) {
      onSave({ ...item, title, difficulty });
    }
  };

  return (
    <Dialog open={!!item} onClose={onClose}>
      <DialogTitle>Edit Mission</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Difficulty"
          fullWidth
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          inputProps={{ min: MIN_DIFFICULTY, max: MAX_DIFFICULTY }}
          margin="dense"
          error={!isValidDifficulty}
          helperText={
            !isValidDifficulty ? "Difficulty must be between 1 and 10" : " "
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}> Cancle </Button>
        <Button onClick={handleSave} color="primary" disabled={!isFormValid}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
