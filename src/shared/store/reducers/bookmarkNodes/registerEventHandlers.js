import events from "shared/constants/events";
import { onNodeCreated } from "./handlers/onNodeCreated";
import { onNodeChanged } from "./handlers/onNodeChanged";
import { onNodeRemoved } from "./handlers/onNodeRemoved";
import { onNodeMoved } from "./handlers/onNodeMoved";

export default function registerEventHandlers(factory) {
  factory.register(events.BM_NODE_MOVED, onNodeMoved);
  factory.register(events.BM_NODE_REMOVED, onNodeRemoved);
  factory.register(events.BM_NODE_CHANGED, onNodeChanged);
  factory.register(events.BM_NODE_CREATED, onNodeCreated);
}
