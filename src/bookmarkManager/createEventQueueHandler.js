import actionTypes from "shared/constants/actionTypes";
import { logInfo } from "shared/lib/browser";

export default function createEventQueueHandler(store, reducer) {
  return function queueHandler(eventQueue) {
    let state = store.getState();
    while (!eventQueue.isEmpty()) {
      const event = eventQueue.dequeue();
      logInfo(event);
      state = reducer(state, event);
    }
    store.dispatch({ type: actionTypes.SET_STATE, state });
  };
}
