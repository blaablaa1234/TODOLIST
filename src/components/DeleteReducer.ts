import { MissionData } from "./TodoList";

export type DeleteState = {
  isModalOpen: boolean;
  itemToDelete: MissionData | null;
  isDeleting: boolean;
  error: string | null;
};

export type ModalReducer =
  | { type: "OPEN_MODAL"; payload: MissionData }
  | { type: "CLOSE_MODAL" }
  | { type: "DELETE_START" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_ERROR"; payload: string };

export const initialDeleteState: DeleteState = {
  isModalOpen: false,
  itemToDelete: null,
  isDeleting: false,
  error: null,
};

const deleteReducer = (
  state: DeleteState,
  action: ModalReducer
): DeleteState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isModalOpen: true,
        itemToDelete: action.payload,
        error: null,
      };
    case "CLOSE_MODAL":
      return initialDeleteState;
    case "DELETE_START":
      return {
        ...state,
        isDeleting: true,
        error: null,
      };
    case "DELETE_SUCCESS":
      return initialDeleteState;
    case "DELETE_ERROR":
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default deleteReducer;
