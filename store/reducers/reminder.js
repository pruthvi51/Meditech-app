import { deleteOne, insert } from "../../util/db";
import {
  ADD_REMINDER,
  DELETE_REMINDER,
  INIT_REMAINDERS,
} from "../actions/reminder";

const initState = [];

export default reminderReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_REMINDER:
      // insert(action.payload);
      return [...state, action.payload];
    case DELETE_REMINDER:
      deleteOne(action.payload.name);
      return state.filter((item) => item.id !== action.payload.id);
    case INIT_REMAINDERS:
      return [...action.payload];
    default:
      return state;
  }
};
