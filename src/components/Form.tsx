import { useForm } from "react-hook-form";
import { Todo } from "./TodoReducer";
import { LuLayoutList } from "react-icons/lu";

type FormData = {
  title: string;
  difficulty: number;
};

const TodoApp = ({ dispatch }: { dispatch: React.Dispatch<any> }) => {
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
    <div className="form">
      <h1>
        {" "}
        Add <LuLayoutList size={40} />
        Mission{" "}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          {...register("title", { required: true })}
          placeholder="Title"
        />
        <input
          className="input"
          type="number"
          {...register("difficulty", { required: true, min: 1, max: 10 })}
          placeholder="Difficulty (1-10)"
        />

        <button className="addButton" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoApp;
