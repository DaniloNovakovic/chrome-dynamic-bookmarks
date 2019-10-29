import actionTypes from "shared/constants/actionTypes";

export default function createEventQueueHandler(store, reducer) {
  return function queueHandler(eventQueue) {
    let state = store.getState();
    while (!eventQueue.isEmpty()) {
      const event = eventQueue.dequeue();
      state = reducer(state, event);
    }
    store.dispatch({ type: actionTypes.SET_STATE, state });
  };
}
