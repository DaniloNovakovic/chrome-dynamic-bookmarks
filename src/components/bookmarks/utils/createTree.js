import getSortedNodes from "./getSortedNodes";
import { isFile } from "./comparisons";
import Folder from "../Folder";

export default function createTree(nodes = {}, rootId = "0") {
  const node = nodes[rootId];
  if (isFile(node)) {
    return <div key={rootId} />;
  }
  const children = _getChildren(nodes, rootId);
  return Folder({
    ...node,
    key: rootId,
    children
  });
}

function _getChildren(nodes, rootId) {
  let children = nodes[rootId].children.map(childId => nodes[childId]);
  let sorted = getSortedNodes(children);
  return sorted.map(child => createTree(nodes, child.id));
}
