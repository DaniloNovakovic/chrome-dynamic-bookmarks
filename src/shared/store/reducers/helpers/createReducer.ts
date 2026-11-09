import { Action, AnyAction, Reducer } from "redux";

import ActionHandlerFactory from "./actionHandlerFactory";

export default function createReducer<
  TState = unknown,
  TAction extends Action<string> = AnyAction,
>(
  handlerFactory: ActionHandlerFactory<TState, TAction>,
  initialState: TState,
): Reducer<TState, TAction> {
  return function (state = initialState, action) {
    const handle = handlerFactory.getHandler(action.type);
    return handle(state, action as AnyAction);
  };
}
