import { isTracked, isFolder } from "./comparisons";

export default function getTrackedByIdNodes(nodes = {}, rootId = "0") {
  const trackedByNodeId = {};
  if (!(rootId in nodes)) {
    return trackedByNodeId;
  }

  function _mapIdsToNodes(ids = []) {
    return ids.filter(nodeId => nodeId in nodes).map(nodeId => nodes[nodeId]);
  }

  (function traverseTree(node) {
    let tracked = isTracked(node);
    if (isFolder(node)) {
      const children = _mapIdsToNodes(node.children);
      for (let child of children) {
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
