import actionTypes from "shared/constants/actionTypes";

function successHandler(_, action) {
  return {
    data: action.bookmarkNodes,
    isFaulted: false,
    errMsg: ""
  };
}
function errorHandler(state, action) {
  return {
    data: state.data,
    isFaulted: true,
    errMsg: action.errMsg
  };
}

export default function registerActionHandlers(factory) {
  factory.register(actionTypes.GET_BM_NODES_SUCCESS, successHandler);
  factory.register(actionTypes.GET_BM_NODES_ERROR, errorHandler);
}
