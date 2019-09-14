import bookmarkNodesReducer from "./bookmarkNodesReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  bookmarkNodes: bookmarkNodesReducer
});

export default rootReducer;
