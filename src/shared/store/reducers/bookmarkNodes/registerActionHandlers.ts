import actionTypes from "@/shared/constants/actionTypes";
import {
  ActionHandler,
  BookmarkNodesAction,
  BookmarkNodesState,
} from "@/shared/types/store.types";

import ActionHandlerFactory from "../helpers/actionHandlerFactory";

type Handler = ActionHandler<BookmarkNodesState, BookmarkNodesAction>;

const successHandler: Handler = (_, action) => {
  return {
    data: action.bookmarkNodes,
    isFaulted: false,
    errMsg: "",
  };
};

const errorHandler: Handler = (state, action) => {
  return {
    data: state.data,
    isFaulted: true,
    errMsg: action.errMsg,
  };
};

const registerActionHandlers = (
  factory: ActionHandlerFactory<BookmarkNodesState, BookmarkNodesAction>,
) => {
  factory.register(actionTypes.GET_BM_NODES_SUCCESS, successHandler);
  factory.register(actionTypes.GET_BM_NODES_ERROR, errorHandler);
};

export default registerActionHandlers;
