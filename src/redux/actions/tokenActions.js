// src/redux/actions/userActions.js
import { ADD_TOKEN, REMOVE_TOKEN } from "../actionTypes";

export const setToken = (token) => ({
  type: ADD_TOKEN,
  payload: token,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN
});
