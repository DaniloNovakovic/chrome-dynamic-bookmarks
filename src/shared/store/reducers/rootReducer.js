import { combineReducers } from "redux";
import bookmarkNodes from "./bookmarkNodesReducer";
import filter from "./filterReducer";

const rootReducer = combineReducers({
  bookmarkNodes,
  filter
});

export default rootReducer;
