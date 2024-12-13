import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  token: tokenReducer,
});

export default rootReducer;