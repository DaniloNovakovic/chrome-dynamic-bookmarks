export default function createReducer(handlerFactory, initialState) {
  return function(state = initialState, action) {
    const handle = handlerFactory.getHandler(action.type);
    return handle(state, action);
  };
}
