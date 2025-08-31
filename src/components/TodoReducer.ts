export type Todo = {
  id: number;
  title: string;
  difficulty: number;
  completed: boolean;
};

export const todoReducer = (state: Todo[], action: any): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: true } : todo
      );
    default:
      return state;
  }
};
