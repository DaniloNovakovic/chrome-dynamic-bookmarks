import connectToBackground from "./connectToBackground";
import { getBookmarkNodes } from "shared/store/actions";
import getEventReducer from "./getEventReducer";
import createEventQueueHandler from "./createEventQueueHandler";
import createDebouncedHandler from "./createDebouncedHandler";

function initStore(store) {
  store.dispatch(getBookmarkNodes());
}

export default function attachStoreToListeners(store) {
  initStore(store);
  const eventReducer = getEventReducer();
  const eventQueueHandler = createEventQueueHandler(store, eventReducer);
  const debouncedEventHandle = createDebouncedHandler(eventQueueHandler);
  connectToBackground(debouncedEventHandle);
}
