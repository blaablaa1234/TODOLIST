import { MissionData } from "../components/TodoList";

export type DeleteState = {
  isModalOpen: boolean;
  itemToDelete: MissionData | null;
};

export type ModalReducer =
  | { type: "OPEN_MODAL"; payload: MissionData }
  | { type: "CLOSE_MODAL" };

export const initialDeleteState: DeleteState = {
  isModalOpen: false,
  itemToDelete: null,
};

const deleteReducer = (
  state: DeleteState,
  action: ModalReducer
): DeleteState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        isModalOpen: true,
        itemToDelete: action.payload,
      };
    case "CLOSE_MODAL":
      return initialDeleteState;
    default:
      return state;
  }
};

export default deleteReducer;
