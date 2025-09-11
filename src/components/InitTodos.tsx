import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./TodoSlice";
import { missionItems } from "./TodoList";
import { RootState } from "../Store";

const InitTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && todos.length === 0) {
      missionItems.forEach((todo) => dispatch(addTodo(todo)));
      initialized.current = true;
      console.log("adding initial missions");
    } else {
      console.log(
        "todos already exist or already initialized"
      );
    }
  }, [todos, dispatch]);

  return null;
};

export default InitTodos;
