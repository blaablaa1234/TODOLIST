import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MissionData } from "components/TodoList";

const loadFromLocalStorage = (): MissionData[] => {
  try {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};
const saveToLocalStorage = (todos: MissionData[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const initialState: MissionData[] = loadFromLocalStorage();
export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<MissionData>) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage(state);
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveToLocalStorage(state);
      }
    },
    editTodo: (state, action: PayloadAction<MissionData>) => {
      const index = state.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveToLocalStorage(state);
      }
    },
    importFromWebSocket(state, action: PayloadAction<MissionData>) {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
  },
});
export const {
  addTodo,
  toggleComplete,
  deleteTodo,
  editTodo,
  importFromWebSocket,
} = todoSlice.actions;
export default todoSlice.reducer;
