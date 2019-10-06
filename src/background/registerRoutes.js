import requestTypes from "shared/constants/requestTypes.js";
import { addBookmarkNodeHandler } from "./requestHandlers";

export default function registerRoutes(router) {
  router.registerHandler(requestTypes.ADD_BM_NODE, addBookmarkNodeHandler);
}
