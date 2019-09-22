import ActionHandlerFactory from "./helpers/actionHandlerFactory";
import * as actions from "../actions/bookmarkNodesActions";

function successHandler(state, action) {
  return {
    ...state,
    nodes: action.bookmarkNodes,
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

function applyFilterHandler(state, action) {
  return {
    ...state,
    filter: action.filter
  };
}

const factory = new ActionHandlerFactory();

factory.register(actions.GET_BM_NODES_SUCCESS, successHandler);
factory.register(actions.GET_BM_NODES_ERROR, errorHandler);
factory.register(actions.APPLY_FILTER, applyFilterHandler);

export default factory;
