export const ADD_REMINDER = "ADD_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";
export const INIT_REMAINDERS = "INIT_REMAINDERS";

import { deleteOne, insert } from "../../util/db";

export const addReminder = (reminder) => {
  insert(reminder);
  return { type: ADD_REMINDER, payload: reminder };
};

export const initRemainders = (remainders) => {
  return { type: INIT_REMAINDERS, payload: remainders };
};

export const deleteRemainder = (id, name) => {
  deleteOne(name);
  return { type: DELETE_REMINDER, payload: { id, name } };
};
