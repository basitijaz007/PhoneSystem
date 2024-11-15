// src/redux/actions/userActions.js
import { SET_USER } from "../actionTypes";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
