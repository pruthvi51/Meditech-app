import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_TOKEN = "SET_TOKEN";
export const LOGOUT = "LOGOUT";

export const authenticate = (token) => {
  AsyncStorage.setItem("token", token);
  return {
    type: SET_TOKEN,
    payload: {
      idToken: token,
    },
  };
};

export const logout = () => {
  AsyncStorage.removeItem("token");
  return { type: LOGOUT };
};
