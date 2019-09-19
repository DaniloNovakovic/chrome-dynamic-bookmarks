function isFile(node) {
  return !!node.url;
}

/**
 * Normalizes bookmark tree to form `{<id>: {...node, children?:[<id>]}}`
 * @param {node} treeRoot - root of the bookmark tree to normalize
 */
export default function normalizeBookmarkTree(treeRoot) {
  const normalized = {};

  (function(node) {
    if (isFile(node)) {
      normalized[node.id] = node;
      return;
    }
    normalized[node.id] = {
      ...node,
      children: node.children.map(value => value.id)
    };
  })(treeRoot);

  return normalized;
}
