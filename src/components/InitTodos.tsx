import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../components/TodoSlice";
import { missionItems } from "../components/TodoList";
import { RootState } from "../Store";

const useInitTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && todos.length === 0) {
      missionItems.forEach((todo) => dispatch(addTodo(todo)));
      initialized.current = true;
      console.log("Adding initial missions");
    } else {
      console.log("Todos already exist");
    }
  }, [todos, dispatch]);
};

export default useInitTodos;
