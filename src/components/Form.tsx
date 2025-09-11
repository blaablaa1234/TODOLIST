import { useForm } from "react-hook-form";
import { LuLayoutList } from "react-icons/lu";
import { Box, TextField, Button, Paper } from "@mui/material";
import { MIN_DIFFICULTY, MAX_DIFFICULTY } from "./constants";
import { MissionData } from "./TodoList";

type FormData = {
  title: string;
  difficulty: number;
};

interface TodoFormProps {
  onSubmit: (item: MissionData) => void;
}

const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleFormSubmit = (data: FormData) => {
    const newTodo: MissionData = {
      id: Date.now(),
      title: data.title,
      difficulty: Number(data.difficulty),
      completed: false,
    };

    onSubmit(newTodo);
    reset();
  };

  return (
    <Paper
      elevation={3}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        padding: 4,
        marginRight: 7,
        maxWidth: 400,
        marginLeft: "auto",
        borderRadius: theme.shape.borderRadius,
      })}
    >
      <Box textAlign="center" mb={2}>
        <h2>
          Add Mission <LuLayoutList size={34} />
        </h2>
      </Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            {...register("title", { required: true })}
          />
          <TextField
            label="Difficulty (1-10)"
            type="number"
            variant="outlined"
            fullWidth
            inputProps={{ min: MIN_DIFFICULTY, max: MAX_DIFFICULTY }}
            {...register("difficulty", { required: true })}
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TodoForm;
