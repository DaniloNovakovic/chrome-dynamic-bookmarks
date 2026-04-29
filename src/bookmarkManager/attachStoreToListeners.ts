import { getBookmarkNodes } from "@/shared/store/actions";

import connectToBackground from "./connectToBackground";
import createDebouncedHandler from "./createDebouncedHandler";
import createEventQueueHandler from "./createEventQueueHandler";
import getEventReducer from "./getEventReducer";

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
