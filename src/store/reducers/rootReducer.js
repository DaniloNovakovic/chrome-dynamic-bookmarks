import bookmarkNodes from "./bookmarkNodesReducer";
import filter from "./filterReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  bookmarkNodes,
  filter
});

export default rootReducer;
