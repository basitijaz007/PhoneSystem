// src/redux/reducers/userReducer.js
import { ADD_TOKEN,REMOVE_TOKEN } from "../actionTypes";

const initialState = {
  token: localStorage.getItem('token') || null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      state.token = action.payload;
    case REMOVE_TOKEN:
      state.token = null;
    default:
      return state;
  }
};

export default tokenReducer;
