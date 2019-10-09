import connectToBackground from "./connectToBackground";
import { getBookmarkNodes } from "shared/store/actions";
import getEventHandlers from "./getEventHandlers";
import createEventQueueHandler from "./createEventQueueHandler";
import createDebouncedHandler from "./createDebouncedHandler";

function initStore(store) {
  store.dispatch(getBookmarkNodes());
}

export default function attachStoreToListeners(store) {
  initStore(store);
  const eventHandlers = getEventHandlers();
  const eventQueueHandler = createEventQueueHandler(store, eventHandlers);
  const debouncedEventHandle = createDebouncedHandler(eventQueueHandler);
  connectToBackground(debouncedEventHandle);
}
