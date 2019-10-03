import createReducer from "./helpers/createReducer";
import ActionHandlerFactory from "./helpers/actionHandlerFactory";
import { APPLY_FILTER } from "../actions/bookmarkNodesActions";

const initialState = {
  searchText: "",
  parentId: ""
};

function applyFilterHandler(_, { filter }) {
  const { searchText, parentId } = filter || {};
  return {
    searchText: searchText,
    parentId: parentId || (!searchText && "1")
  };
}

const factory = new ActionHandlerFactory();
factory.register(APPLY_FILTER, applyFilterHandler);

export default createReducer(factory, initialState);
