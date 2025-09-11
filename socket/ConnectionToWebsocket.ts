import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importFromWebSocket } from "../src/components/TodoSlice";
import { RootState } from "../src/Store";

const ConnectionToWebSocket: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    const wsUrl = "ws://localhost:5555";

    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        if (todos.length >= 12) {
          console.warn(" Reached max todos (12)");
          return;
        }

        let todo = JSON.parse(event.data);

        const preparedTodo = {
          id: Date.now() + Math.floor(Math.random() * 1000),
          title: todo.title || "Untitled Mission",
          difficulty:
            typeof todo.difficulty === "number"
              ? todo.difficulty
              : Math.floor(Math.random() * 10) + 1,
          completed: false,
        };

        dispatch(importFromWebSocket(preparedTodo));
        console.log(" Added todo ", preparedTodo);
      } catch (e) {
        console.error(" Failed to parse todo ", e);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, [dispatch, todos]);

  return null;
};

export default ConnectionToWebSocket;
