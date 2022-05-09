import { LOGOUT, SET_TOKEN } from "../actions/auth";

const initState = {
  token: null,
  isAuthenticated: false,
};

export default AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { token: action.payload.idToken, isAuthenticated: true };
    case LOGOUT:
      return { token: null, isAuthenticated: false };
    default:
      return { ...state };
  }
};
