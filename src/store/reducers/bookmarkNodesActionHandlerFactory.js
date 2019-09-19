import ActionHandlerFactory from "./helpers/actionHandlerFactory";
import * as actions from "../actions/bookmarkNodesActions";

function successHandler(state, action) {
  return action.bookmarkNodes;
}
function errorHandler(state, action) {
  return {
    ...state,
    isFaulted: true,
    errMsg: action.errMsg
  };
}

const factory = new ActionHandlerFactory();

factory.register(actions.GET_BM_NODES_SUCCESS, successHandler);
factory.register(actions.GET_BM_NODES_ERROR, errorHandler);

export default factory;
