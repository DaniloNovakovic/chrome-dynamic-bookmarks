import requestTypes from "shared/constants/requestTypes";
import {
  addBookmarkNodeHandler,
  removeBookmarkNodeHandler
} from "./requestHandlers";

export default function registerRoutes(router) {
  router.registerHandler(requestTypes.ADD_BM_NODE, addBookmarkNodeHandler);
  router.registerHandler(
    requestTypes.REMOVE_BM_NODE,
    removeBookmarkNodeHandler
  );
}
