import { useForm } from "react-hook-form";
import { Todo, TodoAction } from "./TodoReducer";
import { LuLayoutList } from "react-icons/lu";
import { Box, TextField, Button, Paper, useTheme } from "@mui/material";

type FormData = {
  title: string;
  difficulty: number;
};

const TodoForm = ({ dispatch }: { dispatch: React.Dispatch<TodoAction> }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: data.title,
      difficulty: data.difficulty,
      completed: false,
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
            inputProps={{ min: 1, max: 10 }}
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
