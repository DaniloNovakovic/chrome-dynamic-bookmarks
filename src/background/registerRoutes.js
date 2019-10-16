import requestTypes from "shared/constants/requestTypes";
import {
  addBookmarkNodeHandler,
  removeBookmarkNodeHandler,
  editBookmarkNodeHandler
} from "./requestHandlers";

export default function registerRoutes(router) {
  router.registerHandler(requestTypes.ADD_BM_NODE, addBookmarkNodeHandler);
  router.registerHandler(
    requestTypes.REMOVE_BM_NODE,
    removeBookmarkNodeHandler
  );
  router.registerHandler(requestTypes.EDIT_BM_NODE, editBookmarkNodeHandler);
}
