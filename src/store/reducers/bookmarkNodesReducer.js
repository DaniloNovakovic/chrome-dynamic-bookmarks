import handlerFactory from "./bookmarkNodesActionHandlerFactory";

const initialState = {
  filter: {},
  nodes: {},
  isFaulted: false,
  errMsg: false,
  breadcrumbs: []
};

const bookmarkNodesReducer = (state = initialState, action) => {
  const handle = handlerFactory.getHandler(action.type);
  return handle(state, action);
};

export default bookmarkNodesReducer;
