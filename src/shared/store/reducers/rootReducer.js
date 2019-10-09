import { combineReducers } from "redux";
import bookmarkNodes from "./bookmarkNodes";
import filter from "./filter";
import actionTypes from "shared/constants/actionTypes";

const appReducer = combineReducers({
  bookmarkNodes,
  filter
});

function rootReducer(state, action) {
  if (action.type === actionTypes.SET_STATE && action.state) {
    state = { ...state, ...action.state };
  }
  return appReducer(state, action);
}

export default rootReducer;
