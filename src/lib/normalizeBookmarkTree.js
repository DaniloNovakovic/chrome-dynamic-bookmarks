function isFile(node) {
  return !!node.url;
}

/**
 * Normalizes bookmark tree to form `{<id>: {...node, children?:[<id>]}}`
 * @param {node} treeRoot - root of the bookmark tree to normalize
 */
export default function normalizeBookmarkTree(treeRoot) {
  const normalized = {};

  (function traverseTree(node) {
    if (isFile(node)) {
      normalized[node.id] = node;
      return;
    }
    let childIds = [];
    for (let child of node.children) {
      traverseTree(child);
      childIds.push(child.id);
    }
    normalized[node.id] = {
      ...node,
      children: childIds
    };
  })(treeRoot);

  return normalized;
}
