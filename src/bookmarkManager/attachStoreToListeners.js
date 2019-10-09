import connectToBackground from "./connectToBackground";
import { getBookmarkNodes } from "shared/store/actions";

export default function attachStoreToListeners(store) {
  store.dispatch(getBookmarkNodes());
  connectToBackground();
}
