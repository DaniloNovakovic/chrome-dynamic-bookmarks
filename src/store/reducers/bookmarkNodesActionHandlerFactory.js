import ActionHandlerFactory from "./helpers/actionHandlerFactory";
import * as actions from "../actions/bookmarkNodesActions";
import getBreadcrumbs from "lib/getBreadcrumbs";

function successHandler(state, action) {
  const nodes = { ...action.bookmarkNodes };
  return {
    ...state,
    nodes,
    isFaulted: false,
    errMsg: ""
  };
}
function errorHandler(state, action) {
  return {
    ...state,
    isFaulted: true,
    errMsg: action.errMsg
  };
}

function applyFilterHandler(state, { filter = {} }) {
  const parentId = filter.parentId;
  const breadcrumbs = getBreadcrumbs(state.nodes, parentId);

  return {
    ...state,
    filter,
    breadcrumbs
  };
}

const factory = new ActionHandlerFactory();

factory.register(actions.GET_BM_NODES_SUCCESS, successHandler);
factory.register(actions.GET_BM_NODES_ERROR, errorHandler);
factory.register(actions.APPLY_FILTER, applyFilterHandler);

export default factory;
