import createReducer from "./helpers/createReducer";
import ActionHandlerFactory from "./helpers/actionHandlerFactory";
import actionTypes from "shared/constants/actionTypes";

const initialState = {
  data: {},
  isFaulted: false,
  errMsg: ""
};

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

const factory = new ActionHandlerFactory();
factory.register(actionTypes.GET_BM_NODES_SUCCESS, successHandler);
factory.register(actionTypes.GET_BM_NODES_ERROR, errorHandler);

export default createReducer(factory, initialState);
