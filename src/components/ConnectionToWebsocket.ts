import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodoFromWebSocket } from "../components/TodoSlice";
import { store } from "../Store";

const useWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const wsUrl = "ws://localhost:5555";
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const state = store.getState();
        const todos = state.todos;

        if (todos.length >= 12) {
          console.warn(" Reached max todos (12)");
          return;
        }

        const todo = JSON.parse(event.data);

        const preparedTodo = {
          id: Date.now() + Math.floor(Math.random() * 1000),
          title: todo.title || "Untitled Mission",
          difficulty:
            typeof todo.difficulty === "number"
              ? todo.difficulty
              : Math.floor(Math.random() * 10) + 1,
          completed: false,
        };

        dispatch(addTodoFromWebSocket(preparedTodo));
        console.log(" Added todo from WebSocket:", preparedTodo);
      } catch (e) {
        console.error(" Failed to parse todo from WebSocket:", e);
      }
    };

    ws.onerror = (err) => {
      console.error(" WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);
};

export default useWebSocket;
