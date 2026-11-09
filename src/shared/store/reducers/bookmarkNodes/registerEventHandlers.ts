import events from "@/shared/constants/events";
import { BookmarkNodesAction, BookmarkNodesState } from "@/shared/types";

import ActionHandlerFactory from "../helpers/actionHandlerFactory";
import { onNodeChanged } from "./handlers/onNodeChanged";
import { onNodeCreated } from "./handlers/onNodeCreated";
import { onNodeMoved } from "./handlers/onNodeMoved";
import { onNodeRemoved } from "./handlers/onNodeRemoved";

export default function registerEventHandlers(
  factory: ActionHandlerFactory<BookmarkNodesState, BookmarkNodesAction>,
) {
  factory.register(events.BM_NODE_MOVED, onNodeMoved);
  factory.register(events.BM_NODE_REMOVED, onNodeRemoved);
  factory.register(events.BM_NODE_CHANGED, onNodeChanged);
  factory.register(events.BM_NODE_CREATED, onNodeCreated);
}
