import axios from "axios";

const API_KEY = "AIzaSyDk3xLEPyBg1c4ADxVJvYoOrSMX_NJqzyk";

export const createUser = async (email, password) => {
  const res = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  return res;
};

export const signInUser = async (email, password) => {
  const res = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  return res;
};
