import requestTypes from "@/shared/constants/requestTypes";

import type createRouter from "./createRouter";
import {
  addBookmarkNodeHandler,
  copyBookmarkNodeHandler,
  editBookmarkNodeHandler,
  moveBookmarkNodeHandler,
  removeBookmarkNodeHandler,
} from "./requestHandlers";

export default function registerRoutes(
  router: ReturnType<typeof createRouter>
) {
  router.registerHandler(requestTypes.ADD_BM_NODE, addBookmarkNodeHandler);
  router.registerHandler(
    requestTypes.REMOVE_BM_NODE,
    removeBookmarkNodeHandler
  );
  router.registerHandler(requestTypes.EDIT_BM_NODE, editBookmarkNodeHandler);
  router.registerHandler(requestTypes.COPY_BM_NODE, copyBookmarkNodeHandler);
  router.registerHandler(requestTypes.MOVE_BM_NODE, moveBookmarkNodeHandler);
}
