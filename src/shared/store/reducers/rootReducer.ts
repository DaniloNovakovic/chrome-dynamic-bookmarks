import { AnyAction, combineReducers } from "redux";

import actionTypes from "@/shared/constants/actionTypes";

import alert from "./alert";
import bookmarkNodes from "./bookmarkNodes";
import clipboard from "./clipboard";
import filter from "./filter";
import selectedNodeIds from "./selectedNodeIds";

const appReducer = combineReducers({
  alert,
  bookmarkNodes,
  clipboard,
  filter,
  selectedNodeIds,
});

const rootReducer = (
  state: Parameters<typeof appReducer>[0],
  action: AnyAction,
) => {
  if (action.type === actionTypes.SET_STATE && action.state) {
    state = { ...state, ...action.state };
  }
  return appReducer(state, action);
};

export default rootReducer;
