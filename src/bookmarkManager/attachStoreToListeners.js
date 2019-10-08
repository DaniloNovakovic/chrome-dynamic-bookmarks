import connectToBackground from "./connectToBackground";
import { getBookmarkNodes } from "shared/store/actions";

export default function attachStoreToListeners(store) {
  connectToBackground();
  store.dispatch(getBookmarkNodes());
}
