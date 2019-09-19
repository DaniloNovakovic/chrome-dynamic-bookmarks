import handlerFactory from "./bookmarkNodesActionHandlerFactory";

const bookmarkNodesReducer = (state = {}, action) => {
  const handle = handlerFactory.getHandler(action.type);
  return handle(state, action);
};

export default bookmarkNodesReducer;
