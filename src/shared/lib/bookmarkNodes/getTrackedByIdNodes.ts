import { NormalizedDynamicBookmark } from "@/shared/types";

import { isFolder, isTracked } from "./comparisons";

export default function getTrackedByIdNodes(
  nodes: Record<string, NormalizedDynamicBookmark> = {},
  rootId = "0",
) {
  const trackedByNodeId: Record<string, boolean> = {};
  if (!(rootId in nodes)) {
    return trackedByNodeId;
  }

  function _mapIdsToNodes(ids = []) {
    return ids
      .filter((nodeId) => nodeId in nodes)
      .map((nodeId) => nodes[nodeId]);
  }

  (function traverseTree(node) {
    let tracked = isTracked(node);
    if (isFolder(node)) {
      const children = _mapIdsToNodes(node.children);
      for (const child of children) {
        if (traverseTree(child)) {
          tracked = true;
        }
      }
    }
    if (tracked) {
      trackedByNodeId[node.id] = true;
    }
    return tracked;
  })(nodes[rootId]);

  return trackedByNodeId;
}
