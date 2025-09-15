import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MissionData } from "components/TodoList";

const initialState: MissionData[] = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<MissionData>) => {
      state.push(action.payload);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editTodo: (state, action: PayloadAction<MissionData>) => {
      const index = state.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    addTodoFromWebSocket: (state, action: PayloadAction<MissionData>) => {
      state.push(action.payload);
    },
  },
});

export const {
  addTodo,
  toggleComplete,
  deleteTodo,
  editTodo,
  addTodoFromWebSocket,
} = todoSlice.actions;

export default todoSlice.reducer;

