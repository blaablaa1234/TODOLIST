export type Todo = {
  id: number;
  title: string;
  difficulty: number;
  completed: boolean;
};

export type TodoAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_COMPLETE"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: true } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};
