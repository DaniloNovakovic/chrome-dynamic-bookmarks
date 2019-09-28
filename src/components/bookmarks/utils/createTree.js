import getSortedNodes from "./getSortedNodes";
import { isFile } from "./comparisons";
import Folder from "../Folder";
import File from "../File";

const defaultOptions = {
  ignoreFiles: true
};

export default function createTree(
  nodes = {},
  rootId = "0",
  options = defaultOptions
) {
  const node = nodes[rootId];
  if (isFile(node)) {
    return File({ ...node, key: { rootId } });
  }
  const children = _getChildren(nodes, rootId, options);
  return Folder({
    ...node,
    key: rootId,
    children
  });
}

function _getChildren(nodes, rootId, options = {}) {
  let children = nodes[rootId].children.map(childId => nodes[childId]);
  let sorted = getSortedNodes(children);
  if (options.ignoreFiles) {
    sorted = sorted.filter(child => !isFile(child));
  }
  return sorted.map(child => createTree(nodes, child.id));
}
